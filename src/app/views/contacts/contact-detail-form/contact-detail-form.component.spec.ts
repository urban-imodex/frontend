import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailFormComponent } from './contact-detail-form.component';

describe('ContactDetailFormComponent', () => {
  let component: ContactDetailFormComponent;
  let fixture: ComponentFixture<ContactDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});