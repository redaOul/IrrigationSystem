import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardsComponentComponent } from './info-cards-component.component';

describe('InfoCardsComponentComponent', () => {
  let component: InfoCardsComponentComponent;
  let fixture: ComponentFixture<InfoCardsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCardsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
