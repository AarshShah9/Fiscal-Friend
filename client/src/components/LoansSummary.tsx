import ApexCharts from 'apexcharts';
import { useContext, useEffect } from 'react';
import {LoansContext } from '../views/Savings';

const loanOptions= (loanAccount: LoanAccountType) => {
    return {
        chart: {
            height:450,
            width:'80%',
            type:'bar',
            background:'#f4f4f4',
            foreColour: '#333'
        },
        series: [{
            name: "Money in CAD",
            data: [loanAccount.loc, loanAccount.mortgage]
        }],
        xaxis: {
            categories: ["Line of Credit", "Mortgages"]
        },
        fill: {
            colors:['#10B981']
        },
        dataLabels: {
            enabled: false
        }
    }
}

type LoanAccountType = {
    loc: number;
    mortgage: number;
  };

export default function LoansSummary() {
    const loanAccount = useContext(LoansContext) as LoanAccountType;

    useEffect(() => {
        const loanElement = document.getElementById('bar-chart-loans');
    
        if ((loanElement && typeof ApexCharts !== 'undefined')) {
          if (loanElement.children.length === 0) {
            const savingsChart = new ApexCharts(
              loanElement,
              loanOptions(loanAccount));
            savingsChart.render();
            
          } 
        }
      }, []);

    return (
        <div className="flex-col items-center justify-center pt-28">
            <div className="flex justify-center items-center">
                <div className="bg-[#D1FAE5] bg-opacity-25 flex justify-center h-36 w-3/5 p-4 border-[1.5px] border-[#10B981]">
                    <div>
                        <p><u>Summary of Loans</u></p>
                        <div>
                            <ul className="text-center">
                                <li><b>Line of Credit:</b> ${loanAccount.loc}</li>
                                <li><b>Mortgage:</b> ${loanAccount.mortgage}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 flex justify-center" id="bar-chart-loans"></div>
        </div>
    );
}