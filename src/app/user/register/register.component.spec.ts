import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AuthService } from 'src/app/services/auth.service';
import { InputComponent } from 'src/app/shared/input/input.component';
import { EmailTaken } from '../validators/email-taken';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const emailTakenServiceStub = {
    validate: () => { },
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, InputComponent],
      imports: [ReactiveFormsModule, NgxMaskModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: EmailTaken, useValue: emailTakenServiceStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
