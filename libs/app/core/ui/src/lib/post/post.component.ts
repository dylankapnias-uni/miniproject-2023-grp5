import { Component, EventEmitter, Output  } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  imagePreview!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result !== null) {
          this.imagePreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
        }
      };
    }
  }

  onUpload() {
    // Add your code to post the image here
  }
}
