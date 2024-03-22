import React, { useState } from 'react';
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";
import axios from "axios";
import { URL } from '../utils/constants';

IgrFinancialChartModule.register();

export class StockItem {
  public open?: number;
  public close?: number;
  public high?: number;
  public low?: number;
  public volume?: number;
  public date?: Date;
}

class FinancialChartStockIndexChart extends React.Component<any, any> {
  public data: any[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      data: [] ,
      symbol: ''
    };
    this.initData();
  }

  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { symbol } = this.state;
    if (symbol.trim() !== '') {
      console.log(symbol.trim());
      // this.props.onSymbolSubmit(symbol.trim());
      this.setState({ symbol: '' });
    }
  };

  handleChange = (e: { target: { value: any; }; }) => {
    this.setState({ symbol: e.target.value });
  };

  public initData() {
    FinancialChartStockIndexChart.getStockData('AAPL').then((stocks: any[]) => {
      this.setState({ data: stocks });
    });
  }

  public static async getStockData(symbol:string): Promise<StockItem[]> {
    let stockData:StockItem[] = [];
    let res = await axios.post(`${URL}/stock/search`, {'symbol':symbol});
    stockData = this.convertData(res.data.dataList);
    console.log(stockData);
    (stockData as any).__dataIntents = {
      close: ["SeriesTitle/Microsoft"]
    };
    return new Promise<StockItem[]>((resolve, reject) => {
      resolve(stockData);
    });

  }

  public static convertData(jsonData: any[]): StockItem[] {
    let stockItems: StockItem[] = [];

    for (let json of jsonData) {
      // let parts = json.date.split("T"); // "2020-01-01"
      let item = new StockItem();
      item.date = new Date(json.Date);//new Date(parts[0], parts[1], parts[2]);
      item.open = json.Open;
      item.high = json.High;
      item.low = json.Low;
      item.close = json.Close;
      item.volume = json.Volume;
      stockItems.push(item);

    }

    return stockItems;
  }

  public render(): JSX.Element {
    const { symbol } = this.state.symbol;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="stockSymbol">Enter Stock Symbol:</label>
          <input
            type="text"
            id="stockSymbol"
            value={symbol}
            onChange={this.handleChange}
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
              brushes={["#ff0000", "#00ff00"]}
              dataSource={this.state.data}/>
          </div>
        </div>
      </>
    );
  }
}

export default function Stocks() {
  return (
    <div style={{display: 'flex', width: "100%", height: "100%"}}>
      <FinancialChartStockIndexChart/>
    </div>
  );
}


