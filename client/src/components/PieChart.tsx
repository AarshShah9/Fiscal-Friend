import ApexCharts from 'apexcharts';
import { list } from 'postcss';
import { useContext, useEffect } from 'react';
import { BudgetContext } from '../views/Budget';

interface IBudget {
  income: Number;
  expenses: {
    total: Number;
    itemized: {
      food: Number;
      housing: Number;
      transportation: Number;
      insurance: Number;
      wellness: Number;
      entertainment: Number;
      other: Number;
      mortgage?: Number;
      creditCard?: Number;
    };
  };
  recommendedBudget: {
    food: Number;
    housing: Number;
    transportation: Number;
    insurance: Number;
    wellness: Number;
    entertainment: Number;
    other: Number;
    mortgage?: Number;
    creditCard?: Number;
  };
}

const getChartOptions = (
  expensesValues: number[],
  expensesLables: string[],
  totalExpenses: number
) => {
  return {
    series: expensesValues,
    chart: {
      width: '40%',
      type: 'donut',
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#10b981',
        shadeTo: 'dark',
        shadeIntensity: 0.65,
      },
    },
    stroke: {
      colors: ['transparent'],
      lineCap: '',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: 'Expenses',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 20,
              formatter: function () {
                return '$' + totalExpenses;
              },
            },
            value: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 30,
              offsetY: -20,
              formatter: function (value: any) {
                return value;
              },
            },
          },
          size: '70%',
        },
        size: 200,
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: expensesLables,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif',
      fontSize: 15,
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value: any) {
          return value;
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
};

export default function PieChart() {
  const budget = useContext(BudgetContext) as IBudget;

  var expenseNames = [] as string[];
  var expenseValues = [] as number[];
  var totalExpenses = budget.expenses.total as number;

  console.log(Object.entries(budget.expenses.itemized));

  useEffect(() => {
    // Iterate over each key-value pair in the expense object
    Object.entries(budget.expenses.itemized).forEach(
      ([itemName, itemValue]) => {
        expenseNames.push(itemName);
        expenseValues.push(itemValue as number);
      }
    );

    totalExpenses = Number(budget.expenses.total);

    const chartElement = document.getElementById('donut-chart');

    if (chartElement && typeof ApexCharts !== 'undefined' && Number(budget.expenses.total) > 0) {
      // remove previous chart
      chartElement.innerHTML = '';

      // create new chart
      const chart = new ApexCharts(
        chartElement,
        getChartOptions(expenseValues, expenseNames, totalExpenses)
      );
      chart.render();
    }
  }, [budget]);

  return <div className="py-6 flex justify-center" id="donut-chart"></div>;
}
