import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTripComponent } from './book-trip.component';

describe('BookTripComponent', () => {
  let component: BookTripComponent;
  let fixture: ComponentFixture<BookTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
