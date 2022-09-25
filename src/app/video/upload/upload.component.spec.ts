import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';
import { ClipService } from 'src/app/services/clip.service';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  const authServiceStub = {
    user: of({}),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadComponent],
      providers: [
        { provide: AngularFireStorage, useValue: {} },
        { provide: AngularFireAuth, useValue: authServiceStub },
        { provide: ClipService, useValue: {} },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
