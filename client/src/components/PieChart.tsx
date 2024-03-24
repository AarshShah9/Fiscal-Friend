import ApexCharts from 'apexcharts';
import { list } from 'postcss';
import { useContext, useEffect } from 'react';
import { BudgetContext } from '../views/Budget';

type ExpenseItem = { [key: string]: number };

type Budget = {
  income: number;
  expenses: {
    total: number;
    itemized: ExpenseItem[];
  };
};

const getChartOptions = (
  expensesValues: number[],
  expensesLables: string[]
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
              formatter: function (w: any) {
                const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
                return '$' + sum;
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
  const budget = useContext(BudgetContext) as Budget;

  var expenseNames = [] as string[];
  var expenseValues = [] as number[];

  budget.expenses.itemized.forEach((expenseItem) => {
    // Iterate over each key-value pair in the expense object
    Object.entries(expenseItem).forEach(([itemName, itemValue]) => {
      expenseNames.push(itemName);
      expenseValues.push(itemValue);
    });
  });

  useEffect(() => {
    const chartElement = document.getElementById('donut-chart');

    if (chartElement && typeof ApexCharts !== 'undefined') {
      // Check if the chart already exists
      if (chartElement.children.length === 0) {
        const chart = new ApexCharts(
          chartElement,
          getChartOptions(expenseValues, expenseNames)
        );
        chart.render();

        // Get all the checkboxes by their class name
        const checkboxes = document.querySelectorAll(
          '#devices input[type="checkbox"]'
        );
      }
    }
  }, []);

  return <div className="py-6 flex justify-center" id="donut-chart"></div>;
}
