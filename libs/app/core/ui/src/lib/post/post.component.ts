import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { IUserProfile } from '@mp/api/users/util';
import { Select, Store } from '@ngxs/store';
import { ProfileState } from '@mp/app/profile/data-access';
import { Observable } from 'rxjs';
import { UploadPost } from '@mp/app/profile/util';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

  image!: File;
  imagePreview!: SafeResourceUrl;
  profile!: IUserProfile | null;
  @Select(ProfileState.profile) profile$!: Observable<IUserProfile | null>;

  constructor(private sanitizer: DomSanitizer, public store: Store) {
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if (profile)
        this.profile = profile;
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    if (this.image) {
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        if (reader.result !== null) {
          this.imagePreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
        }
      };
    }
  }

  onUpload() {
    if(this.profile)
      this.store.dispatch(new UploadPost({uid:this.profile.userId, post:this.image}));
  }
}
