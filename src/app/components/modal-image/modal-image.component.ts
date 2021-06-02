import { Component, Host, OnInit, ViewChild } from '@angular/core';
import { UploadFilesService } from '../../services/upload-files.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../services/modal-image.service';
import { UsersComponent } from 'src/app/pages/maintenance/users/users.component';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  imgUpload: File;
  imgTemp: string | ArrayBuffer;

  constructor(public modalSvc: ModalImageService,
              /*@Host() private usersC: UsersComponent,*/
              private uploadFile: UploadFilesService) { }

  ngOnInit(): void {
  }

  showImage(file: File): void {
    this.imgUpload = file;
    // console.log(file);

    if (!file) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.imgTemp = reader.result;
  }

  uploadImg(): void {
    this.uploadFile.updateImage(this.imgUpload, this.modalSvc.type, this.modalSvc.id)
      .then(img => {
        // this.usersC.loadData();
        this.modalSvc.hideModal();
      }).catch(err => this.messageError(err.error));
  }

  cancel(): void {
    this.imgTemp = null;
    this.imgUpload = null;
    this.modalSvc.hideModal();
  }

  messageError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

}
