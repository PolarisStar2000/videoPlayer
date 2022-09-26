import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ClipService } from 'src/app/services/clip.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { InputComponent } from 'src/app/shared/input/input.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditComponent,
        InputComponent,
        AlertComponent,
        ModalComponent,
      ],
      imports: [ReactiveFormsModule, NgxMaskModule.forRoot()],
      providers: [
        { provide: ClipService, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
