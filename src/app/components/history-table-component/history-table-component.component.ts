import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history-table-component',
  imports: [],
  templateUrl: './history-table-component.component.html',
})
export class HistoryTableComponentComponent {
  @Input() history: any[] = [];
}
