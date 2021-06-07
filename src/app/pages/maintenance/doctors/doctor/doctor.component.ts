import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalsService } from '../../../../services/hospitals.service';
import { HospitalI } from '../../../../models/hospital.model';
import { MedicosService } from '../../../../services/medicos.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { ModalImageService } from '../../../../services/modal-image.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [`
  #img {
    cursor: pointer;
  }
  img {
    max-width: 250px;
    width: 100%;
  }
  `]
})
export class DoctorComponent implements OnInit {

  doctorForm: FormGroup;
  hospitals: HospitalI[] = [];
  hospital: HospitalI;
  mid;
  img;

  constructor(private fb: FormBuilder,
              private hospitalSvc: HospitalsService,
              private medicosSvc: MedicosService,
              private activatedRoute: ActivatedRoute,
              private modalSvc: ModalImageService,
              private router: Router) { this.loadDoctor(); }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      nombre: ['', Validators.required],
      hid: ['', Validators.required],
    });
    this.loadHospitals();
    this.showHospital();
  }

  loadHospitals(): void {
    this.hospitalSvc.getHospitals().subscribe(
      resp => this.hospitals = resp.data
    );
  }

  loadDoctor(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.mid = id);

    if (this.mid) {
      this.medicosSvc.getMedico(this.mid).pipe(delay(100)).subscribe(
        resp => {
          if (!resp.status) {
              return this.messageError(resp.msg);
          }
          console.log(resp.data);
          const { nombre, hospital: {_id}, img } = resp.data;
          this.img = img;
          this.doctorForm.setValue({ nombre, hid: _id });
        });
    }
  }

  saveDoctor(): void {
    this.medicosSvc.createMedico(this.doctorForm.value).subscribe(resp => {
      if (!resp.status) {
        return this.messageError(resp.msg);
      }
      this.messageDone();
      this.router.navigate(['/dashboard/doctor', resp.data.mid]);
    });
  }

  updateDoctor(): void {
    const data = { mid: this.mid, ...this.doctorForm.value};
    this.medicosSvc.updateMedico(data).subscribe(resp => {
      (resp.status)
        ? this.messageDone()
        : this.messageError(resp.message);
    });
  }

  showHospital(): void {
    this.doctorForm.get('hid').valueChanges.subscribe(
      hid => this.hospital = this.hospitals.find(resp => resp.hid === hid)
    );
  }

  showModal(): void {
    (this.img)
      ? this.modalSvc.showModal('medicos', this.img, this.mid)
      : this.modalSvc.showModal('medicos', this.img = 'no-img', this.mid);
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
      title: 'Saved!',
      showConfirmButton: false,
      timer: 1000
    });
  }

  cancel(): void {
    this.doctorForm.reset();
    this.router.navigateByUrl('/dashboard/doctors');
  }

}
