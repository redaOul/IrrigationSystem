import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitcherComponentComponent } from './theme-switcher-component.component';

describe('ThemeSwitcherComponentComponent', () => {
  let component: ThemeSwitcherComponentComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
