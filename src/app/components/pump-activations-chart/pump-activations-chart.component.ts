import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChart, ApexAxisChartSeries, ApexFill, ApexLegend, ApexTooltip, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-pump-activations-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './pump-activations-chart.component.html',
})
export class PumpActivationsChartComponent implements OnChanges {
  @Input() data!: { totalRecords: number; pumpActivations: number }; // Object containing totalRecords and pumpActivations
  public chartOptions: any;

  constructor() {
    // Initialize chart options with default empty data
    this.chartOptions = {
      series: [0,0],
      colors: ["#1C64F2", "#16BDCA"],
      chart: {
        height: 300,
        width: '100%',
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: "activations",
                fontFamily: "Inter, sans-serif",
                formatter: (value: number) => this.data.pumpActivations,
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: (value: number) => `${value} activations`,
              },
            },
            size: "70%",
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      labels: ['Pump Activated', 'Pump Inactive'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `${value} activations`,
        },
      },
      xaxis: {
        labels: {
          formatter: (value: number) => `${value} activations`,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const inactive = this.data.totalRecords - this.data.pumpActivations;
    this.chartOptions.series = [this.data.pumpActivations, inactive];
  }
}
