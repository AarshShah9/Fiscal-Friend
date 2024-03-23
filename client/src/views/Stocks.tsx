import { useState } from 'react';
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="stockSymbol">Enter Stock Symbol:</label>
        <input
          type="text"
          id="stockSymbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g., AAPL"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div className="container sample">
        <div className="container">
          <IgrFinancialChart
            width="100%"
            height="100%"
            isToolbarVisible={false}
            chartType="Candle"
            chartTitle="S&P 500"
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
            dataSource={data.dataList}
          />
        </div>
      </div>
    </>
  );
}
