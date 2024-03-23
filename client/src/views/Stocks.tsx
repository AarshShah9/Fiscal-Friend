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
  const [symbol, setSymbol] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value } = e.target[0];
    console.log(value);
    axios
      .post(`${URL}/stock/search`, { symbol: value || '' })
      .then((res) => {
        console.log(res.data);
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

// class FinancialChartStockIndexChart extends React.Component<any, any> {
//   public data: any[] = [];

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       data: [],
//       symbol: '',
//     };
//     this.initData();
//   }

//   handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     const { symbol } = this.state;
//     if (symbol.trim() !== '') {
//       console.log(symbol.trim());
//       // this.props.onSymbolSubmit(symbol.trim());
//       this.setState({ symbol: '' });
//     }
//   };

//   handleChange = (e: { target: { value: any } }) => {
//     this.setState({ symbol: e.target.value });
//   };

//   public initData() {
//     FinancialChartStockIndexChart.getStockData('AAPL').then(
//       (stocks: StockItem[]) => this.setState({ data: stocks })
//     );
//   }

//   public static async getStockData(symbol: string): Promise<StockItem[]> {
//     // Promise<StockItem[]> {
//     let stockData: StockItem[] = [];
//     let res = await axios.post(`${URL}/stock/search`, { symbol: symbol });
//     console.log(res.data);
//     // stockData = this.convertData(res.data.dataList);
//     // console.log(stockData);
//     // (stockData as any).__dataIntents = {
//     //   close: ["SeriesTitle/Microsoft"]
//     // };
//     // return new Promise<StockItem[]>((resolve, reject) => {
//     //   resolve(stockData);
//     // });
//     return res.data.dataList;
//   }

//   public render(): JSX.Element {
//     const { symbol } = this.state.symbol;
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="stockSymbol">Enter Stock Symbol:</label>
//           <input
//             type="text"
//             id="stockSymbol"
//             value={symbol}
//             onChange={this.handleChange}
//             placeholder="e.g., AAPL"
//             required
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <div className="container sample">
//           <div className="container">
//             <IgrFinancialChart
//               width="100%"
//               height="100%"
//               isToolbarVisible={false}
//               chartType="Candle"
//               chartTitle="S&P 500"
//               titleAlignment="Left"
//               titleLeftMargin="25"
//               titleTopMargin="10"
//               titleBottomMargin="10"
//               subtitle="CME - CME Delayed Price, Currency in USD"
//               subtitleAlignment="Left"
//               subtitleLeftMargin="25"
//               subtitleTopMargin="5"
//               subtitleBottomMargin="10"
//               yAxisLabelLocation="OutsideLeft"
//               yAxisMode="Numeric"
//               yAxisTitle="Financial Prices"
//               yAxisTitleLeftMargin="10"
//               yAxisTitleRightMargin="5"
//               yAxisLabelLeftMargin="0"
//               zoomSliderType="None"
//               actualXAxisLabelTextColor="black"
//               actualYAxisLabelTextColor="black"
//               brushes={['#ff0000', '#00ff00']}
//               dataSource={this.state.data}
//             />
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default function Stocks() {
//   return (
//     <div style={{ display: 'flex', width: '100%', height: '100%' }}>
//       <FinancialChartStockIndexChart />
//     </div>
//   );
// }
