import React from 'react';
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";
import { StockIndexData } from './StockIndexData';
import axios from "axios";
import {URL} from '../utils/constants';

IgrFinancialChartModule.register();

export class StockItem {
  public open?: number;
  public close?: number;
  public high?: number;
  public low?: number;
  public volume?: number;

  public date?: Date;
}

const getStockData = async (symbol:string)  => {
  var rawdata: any[] = [];
  const res = await axios.post(`${URL}/stock`,symbol).then((res) => {
    rawdata = res.data;
  });
  return rawdata;
}

class FinancialChartStockIndexChart extends React.Component<any, any> {
  public data: StockItem[];

  // public static async getStockData(): Promise<any[]> {
  //
  // }

    constructor(props: any) {
        super(props);
        this.data = StockIndexData.getData();
        (this.data as any).__dataIntents = {
          close: ["SeriesTitle/Amazon"]
        };
    }
    
    public render(): JSX.Element {
        return (
          <>
            {/*<div>*/}
            {/*  <*/}
            {/*</div>*/}
            <div className="container sample" >
              <div className="container" >
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
                    brushes={["#ff0000","#00ff00"]}
                    dataSource={this.data}/>
                </div>
            </div>
          </>
            );
        }
}
export default function Stocks() {
    return (
        <div style={{display:'flex', width:"100%", height:"100%"}}>
          <FinancialChartStockIndexChart/>
        </div>
        );
    // }
}
