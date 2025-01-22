import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './history-table.component.html',
})
export class HistoryTableComponent {
  @Input() pumpHistory: { timestamp: number; soilMoisture: number; pumpStatus: boolean }[] = [];
}