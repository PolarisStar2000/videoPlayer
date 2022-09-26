import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClipsListComponent } from '../clips-list/clips-list.component';
import { ClipService } from '../services/clip.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const clipsServiceStub = {
    getClips() {
      return of({});
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, ClipsListComponent],
      providers: [
        { provide: ClipService, useValue: clipsServiceStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
