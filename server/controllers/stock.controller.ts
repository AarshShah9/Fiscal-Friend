require('dotenv').config({ path: '../../.env' });
import { Request, Response } from 'express';

interface StockData {
  Date: Date;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
}

export const getStockData = (req: Request, res: Response) => {
  if (!req.body.symbol) {
    return res.status(400).json({ success: false, message: 'Missing symbol' });
  }
  const url: string = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${req.body.symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data: any) => {
      const dataList: StockData[] = formatStockDataList(data);
      const metaData = data['Meta Data'];
      res.status(200).json({metaData, dataList});
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: 'Error fetching stock data' });
    });
};


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
// export default {getStockData}