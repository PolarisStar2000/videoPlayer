import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() activeClip: IClip | null = null;

  clipID = new FormControl('');
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID,
  })
  constructor(private modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }
  ngOnDestroy(): void {
    this.modal.unRegister('editClip');
  }
}
