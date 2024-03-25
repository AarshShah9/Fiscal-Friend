import ApexCharts from 'apexcharts';
import { useContext, useEffect, useState } from 'react';

const savingOptions = (savingAccount: SavingAccountType) => {
  return {
    chart: {
      height: 450,
      width: '80%',
      type: 'bar',
      background: '#F4F4F4',
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
      lines: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      lines: {
        show: false,
      },
    },
    fill: {
      colors: ['#34D399'],
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

const SavingsSummary: React.FC<SavingAccountType> = ({
  chequing,
  savings,
  resp,
}) => {
  const [savingsAccount, setSavingsAccount] = useState({
    chequing: chequing,
    savings: savings,
    resp: resp,
  });

  if (
    savingsAccount.chequing !== chequing ||
    savingsAccount.savings !== savings ||
    savingsAccount.resp !== resp
  ) {
    setSavingsAccount({
      chequing: chequing,
      savings: savings,
      resp: resp,
    });
  }

  useEffect(() => {
    const savingsElement = document.getElementById('bar-chart-savings');
    if (savingsElement && typeof ApexCharts !== 'undefined') {
      // Check if the chart already exists
      if (savingsElement.children.length === 0) {
        const savingsChart = new ApexCharts(
          savingsElement,
          savingOptions(savingsAccount)
        );
        savingsChart.render();
      } else {
        savingsElement.removeChild(savingsElement.children[0]);
        const savingsChart = new ApexCharts(
          savingsElement,
          savingOptions(savingsAccount)
        );
        savingsChart.render();
      }
    }
  }, [savingsAccount]);

  var savingStats = [
    {
      name: 'Chequings',
      stat:
        '$' +
        savingsAccount.chequing.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
    {
      name: 'Savings',
      stat:
        '$' +
        savingsAccount.savings.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
    {
      name: 'RESP',
      stat:
        '$' +
        savingsAccount.resp.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
  ];

  return (
    <div className="flex-col items-center justify-center pt-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Saving Account
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {savingStats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-[#D1FAE5] bg-opacity-50 px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
      <div className="py-6 flex justify-center" id="bar-chart-savings"></div>
    </div>
  );
};

export default SavingsSummary;
