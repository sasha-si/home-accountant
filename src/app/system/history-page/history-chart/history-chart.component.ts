import { ChartData } from './../../shared/interfaces/chart-data';
import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  @Input() chartData!: ChartData;
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: this.chartData.labels,
        datasets: [{
          // data: [
          //   {
          //     label: 'hause',
          //     data: 10000
          //   },
          //   {
          //     label: 'car',
          //     data: 1000
          //   }
          // ],
          data: this.chartData.data,
          backgroundColor: [
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4,
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false
          }
        }
      }
    });
  };

}
