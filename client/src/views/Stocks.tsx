import React, { useState } from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import axios from 'axios';
import { URL } from '../utils/constants';

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
        setSymbol(value);
        setData({
          metaData: res.data.metaData || {},
          dataList: res.data.dataList || [],
        });
      })
      .catch((err) => console.log(err));
  };
  console.log(data.dataList);
  return (
    <>
      <div className="container sample">
        <form onSubmit={handleSubmit} className={'flex items-center'}>
          <label htmlFor="stockSymbol text-bold">Enter Stock Symbol:</label>
          <input
            type="text"
            id="stockSymbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g., VOO (S&P 500 ETF)"
            required
            className="block w-60 rounded-md border-0 m-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold  rounded-full py-2 px-4`}
          >
            Submit
          </button>
        </form>
        <div className="container rounded-lg bg-[#DCDCDC]/50 p-4">
          <IgrFinancialChart
            width="100%"
            height="100%"
            isToolbarVisible={false}
            chartType="Candle"
            chartTitle={symbol}
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
            brushes={['#ff0000', '#00ff00']}
            xAxisMode="time"
            dataSource={data.dataList.map((item: StockItem) => ({
              ...item,
              Date: new Date(item.Date),
            }))}
          />
        </div>
      </div>
    </>
  );
}
