require('dotenv').config({ path: '../../.env' });
import { Request, Response } from 'express';

export const getStockData = (req: Request, res: Response) => {
  if (!req.body.symbol) {
    return res.status(400).json({ success: false, message: 'Missing symbol' });
  }
  const url: string = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${req.body.symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// export default {getStockData}
