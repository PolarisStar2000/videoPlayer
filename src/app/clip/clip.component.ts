import { DatePipe } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clip.model';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class ClipComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  @ViewChild('videoTitle', { static: true }) videoTitle?: ElementRef;
  player?: videojs.Player;
  clip?: IClip;

  constructor(
    public route: ActivatedRoute,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.clip = data['clip'] as IClip;
      this.zone.runOutsideAngular(() => {
        this.player = videojs(this.target?.nativeElement);
        this.player?.src({
          src: this.clip?.url as string,
          type: 'video/mp4',
        });
      });
      this.videoTitle?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });

  }

}
