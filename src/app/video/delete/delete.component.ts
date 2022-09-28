import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit, OnDestroy {
  @Input() activeClip: IClip | null = null;
  inSubmission = false;
  showAlert = false;
  alertColor = 'sky';
  alertMsg = 'Please wait! Deleting clip';
  isDeleted = false;
  @Output() delete = new EventEmitter();

  constructor(
    private modal: ModalService,
    private clipService: ClipService,
  ) { }

  ngOnInit(): void {
    this.modal.register('deleteClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = false;
    this.showAlert = false;
    this.isDeleted = false;
  }

  ngOnDestroy(): void {
    this.modal.unRegister('deleteClip');
  }

  async deleteVideo() {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'sky';
    this.alertMsg = 'Please wait! Deleting clip.';

    try {
      this.clipService.deleteClip(this.activeClip);
    } catch (e) {
      this.inSubmission = false;
      this.alertColor = 'rose';
      this.alertMsg = 'Something went wrong. Try again later';
      this.isDeleted = false;
      return;
    }
    this.delete.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'stone';
    this.alertMsg = 'Success';
    this.isDeleted = true;
    setTimeout(() => {
      this.showAlert = false;
      this.modal.toggleModal('deleteClip');
    }, 1500);
  }
}
