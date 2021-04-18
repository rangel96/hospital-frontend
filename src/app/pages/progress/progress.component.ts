import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['../../../assets/css/pages/progressbar-page.css']
})
export class ProgressComponent {

  constructor() {
  }

  progress1 = 20;
  progress2 = 5;

  get getProgress1(): string {
    return `${ this.progress1 }%`;
  }

  get getProgress2(): string {
    return `${ this.progress2 }%`;
  }

}
