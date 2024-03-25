require('dotenv').config({ path: '../../.env' });
import { Request, Response } from 'express';
import { User, Stock } from '../models';
// import { StockIndexData } from './StockIndexData';
import fakeStockData from './stocks.fake';

// Format of data required by front-end graphs
interface StockData {
  Date: Date | string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
}

// Method makes request to Alpha Vantage API to request for monthly data for a searched symbol
export const getStockData = (req: Request, res: Response) => {
  if (!req.body.symbol) {
    return res.status(400).json({ success: false, message: 'Missing symbol' });
  }
  const url: string = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${req.body.symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

  // const dataList = StockIndexData.getData();
  // Fetech with promises to catch errors or failed request
  fetch(url)
    .then((res) => res.json())
    .then((data: any) => {
      // Call to method to format data for front-end
      let dataList: StockData[] = formatStockDataList(data);
      if (dataList.length === 0) dataList = fakeStockData;

      // Extracts the meta data from API response
      const metaData = data['Meta Data'];
      res.status(200).json({ metaData, dataList });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: 'Error fetching stock data' });
    });
};

// Method formats the data from the API response to be used in front-end graphs
const formatStockDataList = (data: any): StockData[] => {
  const monthlyTimeSeries = data['Monthly Time Series'];

  const stockDataList: StockData[] = [];

  for (const date in monthlyTimeSeries) {
    if (monthlyTimeSeries.hasOwnProperty(date)) {
      const monthlyData = monthlyTimeSeries[date];
      const stockData: StockData = {
        Date: new Date(date),
        Open: parseFloat(monthlyData['1. open']),
        High: parseFloat(monthlyData['2. high']),
        Low: parseFloat(monthlyData['3. low']),
        Close: parseFloat(monthlyData['4. close']),
        Volume: parseFloat(monthlyData['5. volume']),
      };
      stockDataList.push(stockData);
    }
  }

  return stockDataList;
};

// Method to save user favourite symbol
export const saveSymbol = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  if (!req.body.symbol) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  try {
    const newStock = new Stock({
      user: req.body.user,
      symbol: req.body.symbol,
      boughtPrice: 0,
      quantity: 0,
    });

    await newStock.save();
    return res
      .status(201)
      .json({ success: true, message: 'Stock saved', stock: newStock });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error });
  }
};

// Method to retrieve user favourites/bought stocks
export const getSavedStocks = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const stocks = await Stock.find({ user: req.body.user });

  return res.status(201).json({ success: true, stocks });
};

// Method to remove a stock from favourites
export const removeStock = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  try {
    await Stock.findByIdAndDelete(req.body.id);
    return res.status(201).json({ success: true, message: 'Stock removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Method to request user favorites from the stock API
export const requestUserFavorites = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  try {
    const stocks = await Stock.find({ user: req.body.user });
    const stockDataList: StockData[] = [];

    // Iterate through each stock and make API request
    for (const stock of stocks) {
      const url: string = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock.symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      // Format data and add it to the list
      const formattedDataList: StockData[] = formatStockDataList(data);
      stockDataList.push(...formattedDataList);
    }

    return res.status(200).json({
      success: true,
      message: 'Requested user favorites from API',
      data: stockDataList,
    });
  } catch (error) {
    console.error('Error requesting user favorites:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Method to save users bought stocks
export const saveBoughtStock = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }
  if (!req.body.symbol || !req.body.boughtPrice || !req.body.quantity) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  try {
    const newStock = new Stock({
      user: req.body.user,
      symbol: req.body.symbol,
      boughtPrice: req.body.boughtPrice,
      quantity: req.body.quantity,
    });

    await newStock.save();
    return res
      .status(201)
      .json({ success: true, message: 'Stock saved', stock: newStock });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error });
  }
};

export const getSavedBySymbol = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }
  if (!req.body.symbol) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  try {
    const stock = await Stock.findOne({
      user: req.body.user,
      symbol: req.body.symbol,
    });
    if (stock) {
      return res.status(200).json({ success: true, stock });
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'Stock does not exist' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error });
  }
};

export const updateStockQuantity = async (req: Request, res: Response) => {
  const { user, symbol, quantity } = req.body;

  if (!user || !symbol || !quantity) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  try {
    const stock = await Stock.findOne({ user, symbol });

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: 'Stock not found' });
    }

    stock.quantity = quantity;

    const updatedStock = await stock.save();

    return res
      .status(200)
      .json({ success: true, message: 'Stock updated', stock: updatedStock });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error });
  }
};
