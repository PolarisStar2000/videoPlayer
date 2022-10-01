import { DatePipe } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {
  constructor(
    public clipsService: ClipService,
    private zone: NgZone,
  ) {
    this.clipsService.getClips();
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      window.removeEventListener('scroll', this.handleScroll);
    });
    this.clipsService.pageClips = [];
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;
    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
    if (bottomOfWindow) {
      this.zone.run(() => {
        this.clipsService.getClips();
      });
    }
  }

}
