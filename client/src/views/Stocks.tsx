import React, { useState, useEffect } from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import axios from 'axios';
import { URL } from '../utils/constants';
import { ButtonDescription } from 'igniteui-react-core';

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
  const [faves, setFaves] = useState<String[]>([]);
  const [symbol, setSymbol] = useState<String>('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: any) => {
    axios
      .post(`${URL}/stock/search`, { symbol: symbol || '' })
      .then((res) => {
        setData({
          metaData: res.data.metaData || {},
          dataList: res.data.dataList || [],
        });
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (item: any) => {
    axios
      .post(`${URL}/stock/remove`, { stock: item })
      .catch((err) => console.log(err));

    setLoading(!loading);
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    axios
      .post(`${URL}/stock/save`, { symbol: symbol.toUpperCase() || '' })
      .catch((err) => console.log(err));

    setLoading(!loading);
  };

  const getFave = (favSymbol: any) => {
    axios
      .post(`${URL}/stock/search`, { symbol: favSymbol || '' })
      .then((res) => {
        setSymbol(favSymbol.symbol);
        setData({
          metaData: res.data.metaData || {},
          dataList: res.data.dataList || [],
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post(`${URL}/stock/get`)
      .then((res) => {
        setFaves(res.data.stocks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [loading]);

  return (
    <>
      <div className="container sample">
        <div className={'flex items-center space-x-2 '}>
          <div className={'flex items-center'}>
            <label htmlFor="stockSymbol text-bold">Enter Stock Symbol:</label>
            <input
              type="text"
              id="stockSymbol"
              value={symbol.toUpperCase()}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g., VOO (S&P 500 ETF)"
              required
              className="block w-60 rounded-md border-0 m-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
            />
            <button
              onClick={handleSearch}
              className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold  rounded-full py-2 px-4`}
            >
              Submit
            </button>
          </div>
          {symbol !== '' && (
            <div
              onClick={handleSave}
              className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold  rounded-full py-2 px-4`}
            >
              <button>Save</button>
            </div>
          )}
        </div>
        {faves.length > 0 && (
          <div className={'flex items-center space-x-2 mb-8'}>
            <label>Favourites:</label>
            <div className={'flex items-center space-x-2'}>
              {faves.map((item: any, key: any) => (
                <span
                  key={key}
                  data-dismissible="chip"
                  className="cursor-pointer relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                >
                  <span className="mr-5" onClick={() => getFave(item)}>
                    {item.symbol}
                  </span>
                  <button
                    data-dismissible-target="chip"
                    onClick={(e: any) => handleRemove(item)}
                    className="!absolute  top-2/4 right-1 mx-px h-5 max-h-[32px] w-5 max-w-[32px] -translate-y-2/4 select-none rounded-md text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="container rounded-lg bg-[#DCDCDC]/50 p-4">
          <IgrFinancialChart
            width="100%"
            height="100%"
            isToolbarVisible={false}
            chartType="Candle"
            chartTitle={symbol.toUpperCase()}
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
