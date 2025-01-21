import {
  Component,
  OnInit,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, onValue } from '@angular/fire/database';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { initFlowbite } from 'flowbite';

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
  selector: 'app-display-data',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './display-data.component.html',
})
export class DisplayDataComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;
  public currentValue: number = 0;
  public averageValue: number = 0;
  public lastUpdate: string = '';
  public pumpActivations: number = 0;
  public pumpHistory: any[] = [];
  public themeMode: 'light' | 'dark' | 'system' = 'system';

  constructor(private database: Database) {
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
    
    initFlowbite();

    const dbRef = ref(this.database, 'SoilMoistureData');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.processData(data)
      }
    });

    this.updateTheme();
  }

  private processData(data: any) {
    const timestamps = Object.keys(data)
      .map((key) => parseInt(key, 10))
      .sort((a, b) => a - b);
      
    const processedData = timestamps.map(timestamp => ({
      timestamp: timestamp,
      soilMoisture: this.getMoisturePercentage(data[timestamp].soilMoisture),
      pumpStatus: data[timestamp].pumpStatus
    }));

    const lastRecord = processedData[processedData.length - 1];
    this.currentValue = lastRecord.soilMoisture;
    this.lastUpdate = new Date(lastRecord.timestamp * 1000).toLocaleString();
    this.averageValue = Math.round(
      processedData.reduce((acc, val) => acc + val.soilMoisture, 0) / processedData.length
    );

    this.pumpHistory = processedData.filter(record => record.pumpStatus);
    this.pumpActivations = this.pumpHistory.length;

    this.updateChartData(processedData)
  }

  private getMoisturePercentage(rawValue: number): number {
    var dryValue :number = 0
    var wetValue :number = 1000 // to check

    const percentage = ((rawValue - dryValue) / (wetValue - dryValue)) * 100;
    return Math.max(0, Math.min(100, Math.round(percentage)));
  }

  private updateChartData(data: any[]) {
    const seriesData = data.map(record => ({
      x: new Date(record.timestamp * 1000),
      y: record.soilMoisture,
    }));

    this.chartOptions.series = [
      {
        name: 'Moisture Level',
        data: seriesData,
      },
    ];
  }

  toggleTheme(mode: 'light' | 'dark' | 'system') {
    this.themeMode = mode;
    this.updateTheme();
  }

  private updateTheme() {
    const root = document.documentElement;
    if (this.themeMode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', this.themeMode === 'dark');
    }
  }
}
