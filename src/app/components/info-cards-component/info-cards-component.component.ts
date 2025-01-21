import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-cards-component',
  imports: [],
  templateUrl: './info-cards-component.component.html',
})
export class InfoCardsComponentComponent {
  @Input() currentValue = 0;
  @Input() averageValue = 0;
  @Input() lastUpdate = '';
}
