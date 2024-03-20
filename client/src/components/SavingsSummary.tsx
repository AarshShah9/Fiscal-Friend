import ApexCharts from 'apexcharts';
import { useContext, useEffect } from 'react';
import { SavingsContext } from '../views/Savings';

const savingOptions = (savingAccount: SavingAccountType) => {
  return {
    chart: {
      height: 450,
      width: '80%',
      type: 'bar',
      background: '#f4f4f4',
      foreColour: '#333',
    },
    series: [
      {
        name: 'Money in CAD',
        data: [
          savingAccount.chequing,
          savingAccount.savings,
          savingAccount.resp,
        ],
      },
    ],
    xaxis: {
      categories: ['Cheqings', 'Savings', 'RESP'],
    },
    fill: {
      colors: ['#10B981'],
    },
    dataLabels: {
      enabled: false,
    },
  };
};

type SavingAccountType = {
  chequing: number;
  savings: number;
  resp: number;
};

export default function SavingsSummary() {
  const savingAccount = useContext(SavingsContext) as SavingAccountType;

  useEffect(() => {
    const savingsElement = document.getElementById('bar-chart-savings');

    if (savingsElement && typeof ApexCharts !== 'undefined') {
      // Check if the chart already exists
      if (savingsElement.children.length === 0) {
        const savingsChart = new ApexCharts(
          savingsElement,
          savingOptions(savingAccount)
        );
        savingsChart.render();
      }
    }
  }, []);

  return (
    <div className="flex-col items-center justify-center pt-80">
      <div className="flex justify-center items-center">
        <div className="bg-[#D1FAE5] bg-opacity-25 flex justify-center h-36 w-3/5 p-4 border-[1.5px] border-[#10B981]">
          <div>
            <p>
              <u>Summary of Savings</u>
            </p>
            <ul className="text-center">
              <li>
                <b>Chequing:</b> ${savingAccount.chequing}
              </li>
              <li>
                <b>Savings:</b> ${savingAccount.savings}
              </li>
              <li>
                <b>RESP:</b> ${savingAccount.resp}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-6 flex justify-center" id="bar-chart-savings"></div>
    </div>
  );
}
