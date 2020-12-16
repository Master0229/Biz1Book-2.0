import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBookComponent } from './price-book.component';

describe('PriceBookComponent', () => {
  let component: PriceBookComponent;
  let fixture: ComponentFixture<PriceBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
