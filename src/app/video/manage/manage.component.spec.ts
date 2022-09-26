import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { ClipService } from 'src/app/services/clip.service';
import { InputComponent } from 'src/app/shared/input/input.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { EditComponent } from '../edit/edit.component';
import { ManageComponent } from './manage.component';

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;
  const clipsServiceStub = {
    getUserClips() {
      return of({});
    }
  };
  const routeServiceStub = {
    queryParams: of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ManageComponent,
        EditComponent,
        ModalComponent,
        InputComponent,
      ],
      imports: [ReactiveFormsModule, NgxMaskModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: routeServiceStub },
        { provide: ClipService, useValue: clipsServiceStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
