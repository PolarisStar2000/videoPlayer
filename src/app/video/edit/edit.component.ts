import { Component, OnDestroy, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() activeClip: IClip | null = null;
  inSubmission = false;
  showAlert = false;
  alertColor = 'sky';
  alertMsg = 'Please wait! Updating clip';
  @Output() update = new EventEmitter();

  clipID = new UntypedFormControl('');
  title = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  editForm = new UntypedFormGroup({
    title: this.title,
    id: this.clipID,
  })
  constructor(
    private modal: ModalService,
    private clipService: ClipService,
  ) { }

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = false;
    this.showAlert = false;
    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  ngOnDestroy(): void {
    this.modal.unRegister('editClip');
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'sky';
    this.alertMsg = 'Please wait! Updating clip.';

    try {
      await this.clipService.updateClip(
        this.clipID.value, this.title.value);
    } catch (e) {
      this.inSubmission = false;
      this.alertColor = 'rose';
      this.alertMsg = 'Something went wrong. Try again later';
      return;
    }
    this.activeClip['title'] = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'emerald';
    this.alertMsg = 'Success';
  }
}
