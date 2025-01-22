import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-cards',
  imports: [],
  templateUrl: './info-cards.component.html',
})
export class InfoCardsComponent {
  @Input() stats: { currentValue: number, averageValue: number, lastUpdate: string } = {
    currentValue: 0,
    averageValue: 0,
    lastUpdate: ''
  };
}
