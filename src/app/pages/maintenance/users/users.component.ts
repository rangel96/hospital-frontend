import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioI } from '../../../models/usuario.model';
import { UsuariosService } from '../../../services/usuarios.service';
import { SearchService } from '../../../services/search.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ModalImageService } from '../../../services/modal-image.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [`
  i, img {
    cursor: pointer;
  }

  .role {
    width: 130px;
  }
  `]
})
export class UsersComponent implements OnInit {

  users: UsuarioI[];
  desde = 0;
  items = 5;
  total: number;

  constructor(private usuariosSvc: UsuariosService,
              private usuarioSvc: UsuarioService,
              private searchSvc: SearchService,
              private modalSvc: ModalImageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.usuariosSvc.getUsuarios(this.desde, this.items).subscribe(
      resp => {
        if (!resp.status) {
          return this.messageError(resp.msg);
        }
        this.users = resp.data;
        this.total = resp.total;
      }, err => console.warn(err.error));
  }

  changePage(valor: number): void {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.total) {
      this.desde -= valor;
    }

    this.loadData();
  }

  search(term: string): void {
    (!term)
      ? this.loadData()
      : this.searchSvc.search('usuarios', term).subscribe(
        resp => this.users = resp.data,
        err => console.warn(err.error));
  }

  deleteUsuario(id: string): void {

    if (this.usuarioSvc.usuario.uid === id) {
      Swal.fire('Error', 'Error deleting, are yourself', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosSvc.deleteUsuario(id).subscribe(
          resp => {
            if (!resp.status) {
              this.messageError(resp.msg);
            } else {
              Swal.fire(
                'Deleted!',
                'Your user has been deleted.',
                'success'
              );
              this.loadData();
            }
          }
        );
      }
    });
  }

  changeRole(user: UsuarioI): void {
    this.usuariosSvc.updateUsuario(user).subscribe(
      resp => {
        (!resp.status)
          ? this.messageError(resp.msg)
          : console.log(resp.msg);
      }, err => console.warn(err.error));
  }

  messageError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }


  showModal(img: string, id: string): void {
    (img)
      ? this.modalSvc.showModal('usuarios', img, id)
      : this.modalSvc.showModal('usuarios', img = 'no-img', id);
  }
}
