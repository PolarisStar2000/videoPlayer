import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FbTimestampPipe } from '../pipes/fb-timestamp.pipe';
import { ClipComponent } from './clip.component';

describe('ClipComponent', () => {
  let component: ClipComponent;
  let fixture: ComponentFixture<ClipComponent>;
  const routeServiceStub = {
    data: of({}),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClipComponent, FbTimestampPipe],
      providers: [
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
