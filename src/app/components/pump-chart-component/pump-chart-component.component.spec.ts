import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpChartComponentComponent } from './pump-chart-component.component';

describe('PumpChartComponentComponent', () => {
  let component: PumpChartComponentComponent;
  let fixture: ComponentFixture<PumpChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PumpChartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PumpChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
