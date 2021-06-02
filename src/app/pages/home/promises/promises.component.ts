import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  /* ?----- VARIABLES ----- */
  users: any;

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(users => {
      console.log(users);
      this.users = users;
    });

    /*const promises = new Promise((resolve, reject) => {

      (false)
        ? resolve('Hola mundo')
        : reject('Algo salio mal');

    });

    promises.then(msj => console.log(msj))
            .catch(error => console.log('Error en la promesa' + error));

    console.log('Fin del OnInit');*/

  }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {

      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
        .catch(error => reject('Error en la promesa' + error));

    });

  }

}
