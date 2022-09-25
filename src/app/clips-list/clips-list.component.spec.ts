import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FbTimestampPipe } from '../pipes/fb-timestamp.pipe';
import { ClipService } from '../services/clip.service';

import { ClipsListComponent } from './clips-list.component';

describe('ClipsListComponent', () => {
  let component: ClipsListComponent;
  let fixture: ComponentFixture<ClipsListComponent>;
  const clipsServiceStub = {
    getClips() {
      return of({});
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClipsListComponent, FbTimestampPipe],
      providers: [
        { provide: ClipService, useValue: clipsServiceStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
