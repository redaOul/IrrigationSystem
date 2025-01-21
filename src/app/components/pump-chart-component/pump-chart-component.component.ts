import { Component, Input } from '@angular/core';
import { ChartOptions } from './chart-options.model';

@Component({
  selector: 'app-pump-chart-component',
  imports: [],
  templateUrl: './pump-chart-component.component.html',
  styleUrl: './pump-chart-component.component.scss'
})
export class PumpChartComponentComponent {
  @Input() chartOptions!: ChartOptions;
}
