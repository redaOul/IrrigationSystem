import { Component, OnInit } from '@angular/core';
import { ChartOptions } from './chart-options.model';
import { SoilMoistureService } from './soil-moisture.service';


@Component({
  selector: 'app-main-dash-board-component',
  imports: [],
  templateUrl: './main-dash-board-component.component.html',
  styleUrl: './main-dash-board-component.component.scss'
})
export class MainDashBoardComponentComponent implements OnInit {
  public chartOptions!: ChartOptions;
  public pumpChartOptions!: ChartOptions;
  public currentValue = 0;
  public averageValue = 0;
  public lastUpdate = '';
  public pumpHistory: any[] = [];
  public themeMode: 'light' | 'dark' | 'system' = 'system';

  constructor(private soilMoistureService: SoilMoistureService) {}

  ngOnInit() {
    this.soilMoistureService.fetchSoilMoistureData().subscribe((data) => {
      if (data) {
        this.processData(data);
      }
    });
  }

  private processData(data: any) {
    // Processing logic (same as before)
  }

  onThemeChange(mode: 'light' | 'dark' | 'system') {
    this.themeMode = mode;
    this.updateTheme();
  }

  private updateTheme() {
    // Update theme logic
  }
}
