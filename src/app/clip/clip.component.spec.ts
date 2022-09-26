import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ClipsListComponent } from '../clips-list/clips-list.component';
import { FbTimestampPipe } from '../pipes/fb-timestamp.pipe';
import { ClipService } from '../services/clip.service';
import { ClipComponent } from './clip.component';

describe('ClipComponent', () => {
  let component: ClipComponent;
  let fixture: ComponentFixture<ClipComponent>;
  const routeServiceStub = {
    data: of({
      clip: {
        url: '//vjs.zencdn.net/v/oceans.mp4'
      }
    }),
  };
  const clipsServiceStub = {
    getClips() {
      return of({});
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ClipComponent,
        ClipsListComponent,
        FbTimestampPipe,
      ],
      providers: [
        { provide: ClipService, useValue: clipsServiceStub },
        { provide: ActivatedRoute, useValue: routeServiceStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
