import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioI } from '../../models/usuario.model';
import { UploadFilesService } from '../../services/upload-files.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuarioForm: FormGroup;
  usuario: UsuarioI;
  imgUpload: File;
  imgTemp: string | ArrayBuffer;

  constructor(private fb: FormBuilder,
              private usuarioSvc: UsuarioService,
              private uploadFile: UploadFilesService)
  { this.usuario = usuarioSvc.usuario; }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      email: [this.usuario.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      nombre: [this.usuario.nombre, Validators.required]
    });
  }

  updateUsuario(): void {
    this.usuarioSvc.update(this.usuarioForm.value).subscribe(
      resp => {
        if (!resp.status) {
          return this.messageError(resp.msg);
        }
        const {email, nombre} = this.usuarioForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        this.messageDone();
      }, err => this.messageError(err.error)
    );
  }

  showImage(file: File): void {
    this.imgUpload = file;
    // console.log(file);

    if (!file) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.imgTemp = reader.result;
  }

  updateImage(): void {
    this.uploadFile.updateImage(this.imgUpload, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        this.messageDone();
      }).catch(err => this.messageError(err.error));
  }

  fieldInvalid(fieldName: string): boolean {
    return this.usuarioForm.get(fieldName).invalid && this.usuarioForm.get(fieldName).touched;
  }

  messageError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  messageDone(): void {
    Swal.fire({
      icon: 'success',
      title: 'Save success!',
      showConfirmButton: false,
      timer: 1000
    });
  }

}
