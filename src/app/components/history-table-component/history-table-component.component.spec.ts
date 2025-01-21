import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTableComponentComponent } from './history-table-component.component';

describe('HistoryTableComponentComponent', () => {
  let component: HistoryTableComponentComponent;
  let fixture: ComponentFixture<HistoryTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTableComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
