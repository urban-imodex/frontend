import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTagsComponent } from './contact-tags.component';

describe('ContactTagsComponent', () => {
  let component: ContactTagsComponent;
  let fixture: ComponentFixture<ContactTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
