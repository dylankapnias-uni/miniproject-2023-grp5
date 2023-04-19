import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onOk() {
    console.log('OK');
    this.ok.emit();
  }
}
