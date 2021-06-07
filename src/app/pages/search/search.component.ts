import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UsuarioI } from '../../models/usuario.model';
import { MedicoI } from '../../models/medico.model';
import { HospitalI } from '../../models/hospital.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [`
    tr {
      cursor: pointer
    }
  `]
})
export class SearchComponent implements OnInit {

  term = '';
  total;
  usuarios: UsuarioI[] = [];
  hospitals: HospitalI[] = [];
  doctors: MedicoI[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private searchSvc: SearchService) {  }

  ngOnInit(): void {
    this.catchTerm();
  }

  catchTerm(): void {
    this.activatedRoute.params.pipe(delay(100)).subscribe(({ term }) => {
      (!term)
      ? this.router.navigateByUrl('/dashboard')
      : this.searchSvc.searchGlobal(term).subscribe(resp => {
        if (!resp.status) {
          return;
        }
        this.usuarios = resp.data.usuarios;
        this.hospitals = resp.data.hospitales;
        this.doctors = resp.data.medicos;
        this.total = resp.total;
        this.term = term;
      });
    });
  }

}
