import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
  @Output() themeChanged = new EventEmitter<'light' | 'dark' | 'system'>();

  switchTheme(mode: 'light' | 'dark' | 'system') {
    this.themeChanged.emit(mode);
  }
}
