import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditModalComponent } from './contact-edit-modal.component';

describe('ContactEditModalComponent', () => {
  let component: ContactEditModalComponent;
  let fixture: ComponentFixture<ContactEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
