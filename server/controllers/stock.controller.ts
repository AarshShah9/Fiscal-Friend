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
// export const getStockData = (req: Request, res: Response) => {
//   // Mock data for testing
//   const mockData = {
//     'Meta Data': {
//       '1. Information': 'Monthly Prices (open, high, low, close) and Volumes',
//       '2. Symbol': 'AAPL',
//       '3. Last Refreshed': '2024-03-16',
//       '4. Time Zone': 'US/Eastern',
//     },
//     'Monthly Time Series': {
//       '2024-03-16': {
//         '1. open': '180.56',
//         '2. high': '184.56',
//         '3. low': '179.15',
//         '4. close': '183.22',
//         '5. volume': '123456789',
//       },
//       // Add more sample data as needed
//     },
//   };

//   // Format mock data
//   const formattedStockData = formatStockDataList(mockData);
//   // Sending formatted data as response
//   res.status(200).json(formattedStockData);
// };

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
