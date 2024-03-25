import ApexCharts from 'apexcharts';
import { useContext, useEffect, useState } from 'react';

const loansOptions = (loanAccount: LoanAccountType) => {
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
        data: [loanAccount.loc, loanAccount.mortgage],
      },
    ],
    xaxis: {
      categories: ['Line of Credit', 'Mortgages'],
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

type LoanAccountType = {
  loc: number;
  mortgage: number;
};

const LoansSummary: React.FC<LoanAccountType> = ({ loc, mortgage }) => {
  const [loansAccount, setLoansAccount] = useState({
    loc: loc,
    mortgage: mortgage,
  });

  if (loansAccount.loc !== loc || loansAccount.mortgage !== mortgage) {
    setLoansAccount({
      loc: loc,
      mortgage: mortgage,
    });
  }

  useEffect(() => {
    const loansElement = document.getElementById('bar-chart-loans');

    if (loansElement && typeof ApexCharts !== 'undefined') {
      if (loansElement.children.length === 0) {
        const loansChart = new ApexCharts(
          loansElement,
          loansOptions(loansAccount)
        );
        loansChart.render();
      } else {
        loansElement.removeChild(loansElement.children[0]);
        const loansChart = new ApexCharts(
          loansElement,
          loansOptions(loansAccount)
        );
        loansChart.render();
      }
    }
  }, [loansAccount]);
  var loaningStats = [
    { name: 'Line of Credit', stat: '$' + loansAccount.loc },
    { name: 'Mortgage', stat: '$' + loansAccount.mortgage },
  ];

  return (
    <div className="flex-col items-center justify-center pt-28 pb-24">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Loans Account
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {loaningStats.map((item) => (
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
      <div className="py-6 flex justify-center" id="bar-chart-loans"></div>
    </div>
  );
};

export default LoansSummary;
