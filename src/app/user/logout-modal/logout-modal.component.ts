import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit, OnDestroy {
  constructor(public modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('logout');
  }

  ngOnDestroy(): void {
    this.modal.unRegister('logout');
  }

}
