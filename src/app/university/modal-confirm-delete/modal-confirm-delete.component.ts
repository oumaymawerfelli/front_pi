import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.css']
})
export class ModalConfirmDeleteComponent {
  @Input() isVisible: boolean = false; // Whether the modal is visible
  @Output() confirm: EventEmitter<void> = new EventEmitter(); // Event emitter for confirm action
  @Output() cancel: EventEmitter<void> = new EventEmitter(); // Event emitter for cancel action

  constructor() {}

  // Triggered when the user clicks "Delete"
  onConfirm() {
    this.confirm.emit(); // Emit the confirm event
    this.isVisible = false; // Hide the modal after confirmation
  }

  // Triggered when the user clicks "Cancel"
  onCancel() {
    this.cancel.emit(); // Emit the cancel event
    this.isVisible = false; // Hide the modal after cancellation
  }
}
