import ApexCharts from 'apexcharts';
import { useContext, useEffect } from 'react';
import { BudgetContext } from '../views/Budget';
import { IBudget } from '../views/Budget';

const getChartOptions = (current: object, recommended: object) => {
  const currentData = Object.entries(current).map(([key, value]) => ({
    x: key,
    y: value,
  }));
  const recommendedData = Object.entries(recommended).map(([key, value]) => ({
    x: key,
    y: value,
  }));
  console.log(currentData);
  console.log(recommendedData);

  return {
    colors: ['#1A56DB', '#FDBA8C'],
    series: [
      {
        name: 'recommended',
        color: '#1A56DB',
        data: recommendedData,
      },
      {
        name: 'current',
        color: '#FDBA8C',
        data: currentData,
      },
    ],
    chart: {
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
      width: '100%',
      height: '100%'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '70%',
        borderRadiusApplication: 'end',
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: 'Inter, sans-serif',
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

export default function ColumnChart() {
  const [budget, setBudget] = useContext(BudgetContext) as [IBudget, Function];

  useEffect(() => {
    const chartElement = document.getElementById('column-chart');

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
        getChartOptions(budget.expenses.itemized, budget.recommendedBudget)
      );
      chart.render();
    }
  }, [budget]);

  return <div className="py-6 flex justify-center w-3/5" id="column-chart"></div>;
}
