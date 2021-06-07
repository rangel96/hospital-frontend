import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import Swal from 'sweetalert2';
import { MedicosService } from '../../../services/medicos.service';
import { MedicoI } from '../../../models/medico.model';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [`
  i, img {
    cursor: pointer;
  }
  `]
})
export class DoctorsComponent implements OnInit {

  doctors: MedicoI[];
  desde = 0;
  items = 5;
  total: number;

  constructor(private hospitalSvc: MedicosService,
              private searchSvc: SearchService,
              private modalSvc: ModalImageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.hospitalSvc.getMedicos(this.desde, this.items).subscribe(
      resp => {
        if (!resp.status) {
          return this.messageError(resp.msg);
        }
        this.doctors = resp.data;
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
      : this.searchSvc.search('medicos', term).subscribe(
      resp => this.doctors = resp.data,
      err => console.warn(err.error));
  }

  deleteMedico(id: string): void {

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
        this.hospitalSvc.deleteMedico(id).subscribe(
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

  changeRole(user: MedicoI): void {
    this.hospitalSvc.updateMedico(user).subscribe(
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
      ? this.modalSvc.showModal('medicos', img, id)
      : this.modalSvc.showModal('medicos', img = 'no-img', id);

    this.modalSvc.changeImg.pipe(delay(40)).subscribe(() => this.loadData());
  }

}
