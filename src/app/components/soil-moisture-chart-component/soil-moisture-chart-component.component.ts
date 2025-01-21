import { Component, Input } from '@angular/core';
import { ChartOptions } from './chart-options.model'; // Separate ChartOptions type

@Component({
  selector: 'app-soil-moisture-chart-component',
  imports: [],
  templateUrl: './soil-moisture-chart-component.component.html',
})
export class SoilMoistureChartComponentComponent {
  @Input() chartOptions!: ChartOptions;
}
