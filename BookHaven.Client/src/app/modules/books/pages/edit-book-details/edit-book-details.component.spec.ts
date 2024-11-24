import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookDetailsComponent } from './edit-book-details.component';

describe('EditBookDetailsComponent', () => {
  let component: EditBookDetailsComponent;
  let fixture: ComponentFixture<EditBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
