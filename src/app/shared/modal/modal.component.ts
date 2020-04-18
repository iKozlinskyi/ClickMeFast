import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ModalText {
  title: string;
  body: string;
  submitButton?: string;
  cancelButton?: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  isShown: boolean;

  @Input()
  modalText: ModalText;

  @Output()
  submitModal = new EventEmitter();

  @Output()
  closeModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.submitModal.emit();
  }

  handleClose() {
    this.closeModal.emit();
  }
}
