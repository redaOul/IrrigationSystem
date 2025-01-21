import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayDataComponent } from './components/display-data/display-data.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DisplayDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'irritgation-app';
}
