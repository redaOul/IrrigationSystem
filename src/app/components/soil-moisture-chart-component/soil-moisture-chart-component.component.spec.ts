import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilMoistureChartComponentComponent } from './soil-moisture-chart-component.component';

describe('SoilMoistureChartComponentComponent', () => {
  let component: SoilMoistureChartComponentComponent;
  let fixture: ComponentFixture<SoilMoistureChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilMoistureChartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoilMoistureChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
