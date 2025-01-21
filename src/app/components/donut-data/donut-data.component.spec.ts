import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutDataComponent } from './donut-data.component';

describe('DonutDataComponent', () => {
  let component: DonutDataComponent;
  let fixture: ComponentFixture<DonutDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
