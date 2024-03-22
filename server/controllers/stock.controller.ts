require('dotenv').config({ path: '../../.env' });
import { Request, Response } from 'express';
import { User, Stock } from '../models';

// Format of data required by front-end graphs
interface StockData {
  Date: Date;
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

  // Fetech with promises to catch errors or failed request
  fetch(url)
    .then((res) => res.json())
    .then((data: any) => {
      // Call to method to format data for front-end
      const dataList: StockData[] = formatStockDataList(data);

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

// Method to retrieve user favourites
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

    return res
      .status(200)
      .json({
        success: true,
        message: 'Requested user favorites from API',
        data: stockDataList,
      });
  } catch (error) {
    console.error('Error requesting user favorites:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
