import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AuthService } from 'src/app/services/auth.service';
import { InputComponent } from 'src/app/shared/input/input.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { TabComponent } from 'src/app/shared/tab/tab.component';
import { TabsContainerComponent } from 'src/app/shared/tabs-container/tabs-container.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthModalComponent } from './auth-modal.component';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
      ],
      declarations: [
        AuthModalComponent,
        LoginComponent,
        RegisterComponent,
        TabComponent,
        TabsContainerComponent,
        InputComponent,
        ModalComponent,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
