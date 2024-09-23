import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcommandComponent } from './formcommand.component';

describe('FormcommandComponent', () => {
  let component: FormcommandComponent;
  let fixture: ComponentFixture<FormcommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormcommandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormcommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
