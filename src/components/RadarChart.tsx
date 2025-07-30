// https://www.chartjs.org/docs/latest/charts/radar.html
import "chart.js/auto";
import { Radar } from "react-chartjs-2";

export default function RadarChart({ userData })
{
    const options = {
        responsive: true,
        elements: {
            line: {
                borderWidth: 1
            }
        },
        plugins: {
            tooltip: {
                enabled: false
            },
        },
        scales: {
            r: {
                pointLabels: {
                    display: true
                },
                min: 0,
                max: 5,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const testData = {
        labels: [
            'Eating',
            'Drinking',
            'Sleeping',
            'Designing',
            'Coding',
            'Running',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [3, 2, 3, 4, 5, 3],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
        }]
    };

    const data = userData ?? testData;

    return (
    <div className="pt-[10px]">
        <Radar data={data} options={options} />
    </div>
)}

