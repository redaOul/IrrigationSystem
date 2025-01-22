import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpActivationsChartComponent } from './pump-activations-chart.component';

describe('PumpActivationsChartComponent', () => {
  let component: PumpActivationsChartComponent;
  let fixture: ComponentFixture<PumpActivationsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PumpActivationsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpActivationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
