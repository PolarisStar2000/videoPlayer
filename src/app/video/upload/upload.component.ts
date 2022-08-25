import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { v4 as uuid } from 'uuid';
import { last, switchMap } from 'rxjs';
import { ClipService } from 'src/app/services/clip.service';
import IClip from 'src/app/models/clip.model';
import { Router } from '@angular/router';
import { FfmpegService } from 'src/app/services/ffmpeg.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  isDragOver = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your clip is being uploaded.';
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
  task?: AngularFireUploadTask;
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ])
  uploadForm = new FormGroup({
    title: this.title,
  })

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router,
    public ffmpegService: FfmpegService,
  ) {
    this.auth.user.subscribe(user => this.user = user);
    this.ffmpegService.init();
  }

  ngOnDestroy(): void {
    this.task?.cancel();
  }

  storeFile($event: Event) {
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== "video/mp4") {
      return;
    }
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, ''),
    )
    this.nextStep = true;
  }

  uploadFile() {
    this.uploadForm.disable();
    this.showAlert = true;
    this.alertColor = 'indigo';
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    this.task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);
    this.task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100;
    });
    this.task.snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: async (url) => {
          const clip: IClip = {
            uid: this.user?.uid!,
            displayName: this.user?.displayName!,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }
          const clipDocRef = await this.clipsService.createClip(clip);

          this.alertColor = 'green';
          this.alertMsg = 'Success! Your clip is now ready to share with the world.'
          this.showPercentage = false;
          setTimeout(() => {
            this.router.navigate([
              'clip', clipDocRef.id
            ]);
          }, 1000);
        },
        error: (error) => {
          this.uploadForm.enable();

          this.alertColor = 'red';
          this.alertMsg = 'Uplod failed! Please try again later.';
          this.inSubmission = true;
          this.showPercentage = false;
          console.error(error);
        }
      });
  }

}
