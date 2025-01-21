import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theme-switcher-component',
  imports: [],
  templateUrl: './theme-switcher-component.component.html',
})
export class ThemeSwitcherComponentComponent {
  @Output() themeChange = new EventEmitter<'light' | 'dark' | 'system'>();

  setTheme(mode: 'light' | 'dark' | 'system') {
    this.themeChange.emit(mode);
  }
}
