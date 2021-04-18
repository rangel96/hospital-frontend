import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
        this.btnClass = `btn ${ this.btnClass }`;
    }
  /* ? Renombrar argumentos */
  // @Input('valor') progress = 50;
  @Input() progress = 0;
  @Input() btnClass = 'btn-primary';

  @Output() valueOutput: EventEmitter<number> = new EventEmitter<number>();

  get getProgress(): string {
    return `${ this.progress }%`;
  }

  changeValue(value: number): void {
    this.progress = this.progress + value;

    if (this.progress >= 100) {
      this.progress = 100;
      return this.valueOutput.emit(100);
    }

    if (this.progress <= 0) {
      this.progress = 0;
      return this.valueOutput.emit(0);
    }

    this.valueOutput.emit(this.progress);

  }

}
