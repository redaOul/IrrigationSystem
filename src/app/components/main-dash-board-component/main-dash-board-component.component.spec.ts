import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashBoardComponentComponent } from './main-dash-board-component.component';

describe('MainDashBoardComponentComponent', () => {
  let component: MainDashBoardComponentComponent;
  let fixture: ComponentFixture<MainDashBoardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashBoardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDashBoardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
