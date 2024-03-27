import React, { useState } from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import axios from 'axios';
import { URL } from '../utils/constants';
import './stocks.css'
IgrFinancialChartModule.register();

interface StockItem {
  Date: Date;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
}

export default function FinancialChartStockIndexChart(props: any) {
  const [data, setData] = useState({ metaData: {}, dataList: [] });
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post(`${URL}/stock/search`, { symbol: value || '' })
      .then((res) => {
        setSymbol(value.toUpperCase());
        setData({
          metaData: res.data.metaData || {},
          dataList: res.data.dataList || [],
        });
      })
      .catch((err) => console.log(err));
  };

  const addFavorite = (e: any) => {

  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={'flex flex-row w-full align-middle justify-items-center'}
      >
        <label htmlFor="stockSymbol text-bold">Enter Stock Symbol:</label>
        <div className={'px-2'}></div>
        <input
          type="text"
          id="stockSymbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g., VOO (S&P 500 ETF)"
          required
          className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
        />
        <div className={'px-2'}></div>
        <button
          type="submit"
          className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full mb-4`}
        >
          Submit
        </button>
      </form>
      {/*<button*/}
      {/*  className={'bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full mb-4'}*/}
      {/*  onClick={}*/}
      {/*>*/}
      {/*Favorite*/}
      {/*</button>*/}
      <div className="container sample">
        <div className="container">
          <div
            id={"favorite-div"}
            // style={{"textAlign": "left"}}
          >
              <h1
                className="text-left align-middle"
              >
                {symbol}
              </h1>
              <div
                className={'w-5'}
              >

              </div>
              <button
                id="favorite"
                className={'bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full mb-4'}
              >
                hello
              </button>
          </div>
          <IgrFinancialChart
            width="100%"
            height="100%"
            isToolbarVisible={false}
            chartType="Candle"
            // chartTitle={symbol}
            titleAlignment="Left"
            titleLeftMargin="25"
            titleTopMargin="10"
            titleBottomMargin="10"
            subtitle="CME - CME Delayed Price, Currency in USD"
            subtitleAlignment="Left"
            subtitleLeftMargin="25"
            subtitleTopMargin="5"
            subtitleBottomMargin="10"
            yAxisLabelLocation="OutsideLeft"
            yAxisMode="Numeric"
            yAxisTitle="Financial Prices"
            yAxisTitleLeftMargin="10"
            yAxisTitleRightMargin="5"
            yAxisLabelLeftMargin="0"
            zoomSliderType="None"
            actualXAxisLabelTextColor="black"
            actualYAxisLabelTextColor="black"
            dataSource={data.dataList}
          />
        </div>
      </div>
    </>
  );
}
