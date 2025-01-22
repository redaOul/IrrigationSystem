import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Database, ref, onValue } from '@angular/fire/database';
import { initFlowbite } from 'flowbite';

import { HistoryTableComponent } from '../history-table/history-table.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { InfoCardsComponent } from '../info-cards/info-cards.component';
import { SoilMoistureChartComponent } from '../soil-moisture-chart/soil-moisture-chart.component';
import { PumpActivationsChartComponent } from '../pump-activations-chart/pump-activations-chart.component';


@Component({
  selector: 'app-display-data',
  standalone: true,
  imports: [CommonModule,
    HistoryTableComponent,
    SoilMoistureChartComponent,
    ThemeSwitcherComponent,
    PumpActivationsChartComponent,
    InfoCardsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './display-data.component.html',
})
export class DisplayDataComponent implements OnInit {
  // public pumpActivations: number = 0;

  public chartData: any[] = [];
  public pumpHistory: { timestamp: number; soilMoisture: number; pumpStatus: boolean }[] = [];
  public stats: { currentValue: number, averageValue: number, lastUpdate: string } = {
    currentValue: 0,
    averageValue: 0,
    lastUpdate: ''
  };
  public pumpData: { totalRecords: number, pumpActivations: number } = { 
    totalRecords: 0,
    pumpActivations: 0
  };
  public themeMode: 'light' | 'dark' | 'system' = 'system';

  constructor(private database: Database) {}

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

    if (processedData.length > 0) {
      this.chartData = processedData.map(record => ({
        timestamp: record.timestamp,
        soilMoisture: record.soilMoisture,
      }));

      const lastRecord = processedData[processedData.length - 1];
      this.stats.currentValue = lastRecord.soilMoisture;
      this.stats.lastUpdate = new Date(lastRecord.timestamp * 1000).toLocaleString();
      this.stats.averageValue = Math.round(
        processedData.reduce((acc, val) => acc + val.soilMoisture, 0) / processedData.length
      );
    }

    this.pumpHistory = processedData.filter(record => record.pumpStatus == "ON");
    console.log(`Parent component:\ntotalRecords ${processedData.length} - pumpActivations ${this.pumpHistory.length}`);
    this.pumpData = {
      totalRecords: processedData.length,
      pumpActivations: this.pumpHistory.length,
    };
  }

  private getMoisturePercentage(rawValue: number): number {
    var dryValue :number = 0
    var wetValue :number = 1000 // to check

    const percentage = ((rawValue - dryValue) / (wetValue - dryValue)) * 100;
    return Math.max(0, Math.min(100, Math.round(percentage)));
  }

  toggleTheme(mode: 'light' | 'dark' | 'system') {
    this.themeMode = mode;
    this.updateTheme();
  }

  public updateTheme() {
    const root = document.documentElement;
    if (this.themeMode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', this.themeMode === 'dark');
    }
  }
}
