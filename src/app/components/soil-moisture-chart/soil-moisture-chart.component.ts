import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexYAxis, ApexTitleSubtitle, ApexLegend, ApexFill, ApexTooltip, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-soil-moisture-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './soil-moisture-chart.component.html',
})
export class SoilMoistureChartComponent implements OnInit, AfterViewInit {
  @Input() chartData: any[] = [];
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;

  public loading: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {
    this.chartOptions = {
      series: [
        {
          name: 'Moisture Level',
          data: [],
        },
      ],
      chart: {
        height: '300',
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy HH:mm',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: '#1C64F2',
          gradientToColors: ['#1C64F2'],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'monotoneCubic',
        width: 4,
      },
      title: {
        text: 'Soil Moisture Trends',
        align: 'left',
      },
      labels: [],
      legend: {
        show: true,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM  yy',
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Moisture Level (%)',
        },
        min: 0,
        max: 100,
      },
    };
  }

  ngOnInit() {
    setTimeout(() => {
      this.updateChartData(this.chartData);
    }, 1000);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  private updateChartData(data: any[]) {
    const seriesData = data.map((record) => ({
      x: new Date(record.timestamp * 1000),
      y: record.soilMoisture,
    }));

    this.chartOptions.series = [
      {
        name: 'Moisture Level',
        data: seriesData,
      },
    ];

    this.loading = false;
  }
}
