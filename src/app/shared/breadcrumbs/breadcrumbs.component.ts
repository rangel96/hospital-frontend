import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, ActivationEnd, Data, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe( ({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${ titulo }`;
    });
  }

  getArgumentosRuta(): Observable<Data> {

    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

}
