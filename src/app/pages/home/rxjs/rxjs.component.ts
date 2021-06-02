import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {

    const obs$ = new Observable( observer => {
      let i = -1;

      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000);
    });

    obs$.subscribe(
      valor => console.log('Subs: ', valor),
      err => console.warn('Error: ', err),
      () => console.log('Obs Terminado')
    );

  }

  ngOnInit(): void {
  }

}
