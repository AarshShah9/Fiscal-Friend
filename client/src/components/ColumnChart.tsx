import ApexCharts from 'apexcharts';
import { useContext, useEffect } from 'react';
import { BudgetContext } from '../views/Budget';
import { IBudget } from '../views/Budget';

const getChartOptions = (budget: IBudget) => {
  
  const moneyIn = budget.income;
  const moneyOut = budget.expenses.total;

  return {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: 'money in',
        color: '#1A56DB',
        data: [{x: '', y: moneyIn}],
      },
      {
        name: 'money out',
        color: '#FDBA8C',
        data: [{x: '', y: moneyOut}],
      },
    ],
    chart: {
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadiusApplication: 'end',
        borderRadius: 8,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
  };
};

export default function BarChart() {
  const [budget, setBudget] = useContext(BudgetContext) as [IBudget, Function];

  useEffect(() => {
    const chartElement = document.getElementById('bar-chart');

    if (
      chartElement &&
      typeof ApexCharts !== 'undefined' &&
      Number(budget.expenses.total) > 0
    ) {
      // remove previous chart
      chartElement.innerHTML = '';

      // create new chart
      const chart = new ApexCharts(
        chartElement,
        getChartOptions(budget)
      );
      chart.render();
    }
  }, [budget]);

  return <div className="py-6 flex justify-center" id="bar-chart"></div>;
}
