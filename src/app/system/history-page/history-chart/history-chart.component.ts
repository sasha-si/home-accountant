import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ChartData } from './../../shared/interfaces/chart-data';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit, OnChanges {

  @Input() chartData!: ChartData;
  chart: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    this.createChart(changes['chartData'].currentValue);
  }

  ngOnInit(): void {
  }

  createChart(data: ChartData) {
    this.chart = new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
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
