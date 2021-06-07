import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { HospitalsService } from '../../../services/hospitals.service';
import { HospitalI } from '../../../models/hospital.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [`
    i, img {
      cursor: pointer;
    }
  `]
})
export class HospitalsComponent implements OnInit {

  hospitals: HospitalI[];
  desde = 0;
  items = 5;
  total: number;

  constructor(private hospitalSvc: HospitalsService,
              private searchSvc: SearchService,
              private modalSvc: ModalImageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.hospitalSvc.getHospitals(this.desde, this.items).subscribe(
      resp => {
        if (!resp.status) {
          return this.messageError(resp.msg);
        }
        this.hospitals = resp.data;
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
      : this.searchSvc.search('hospitales', term).subscribe(
      resp => this.hospitals = resp.data,
      err => console.warn(err.error));
  }

  createHospital(): void {

    Swal.fire({
      title: 'Name Hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Add',
      preConfirm: nombre => {
        this.hospitalSvc.createHospital(nombre).subscribe(
          resp => {
            (!resp.status)
              ? this.messageError(resp.msg)
              : this.loadData();
          }, err => console.warn(err.error));
      }
    });
  }

  updateHospital(id: string, nombre: string): void {
    this.hospitalSvc.updateHospital(id, nombre).subscribe(
      resp => {
        (!resp.status)
          ? this.messageError(resp.msg)
          : this.messageDone();
      }, err => console.warn(err.error));
  }

  deleteHospital(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
    if (result.isConfirmed) {
      this.hospitalSvc.deleteHospital(id).subscribe(
        resp => {
          if (!resp.status) {
            this.messageError(resp.msg);
          } else {
            Swal.fire(
              'Deleted!',
              'Hospital has been deleted.',
              'success'
            );
            this.loadData();
          }
        }
      );
    }
  });
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
      position: 'top-end',
      icon: 'success',
      title: 'Hospital saved',
      showConfirmButton: false,
      timer: 1000
    });
    this.loadData();
  }

  showModal(img: string, id: string): void {
    (img)
      ? this.modalSvc.showModal('hospitales', img, id)
      : this.modalSvc.showModal('hospitales', img = 'no-img', id);
    this.modalSvc.changeImg.pipe(delay(30)).subscribe(() => this.loadData());
  }

}
