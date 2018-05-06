import { Board } from './../../../types/board.type';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  template: `
  board
  `,
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  constructor() {}

  ngOnInit() {
    console.log(this.board);
  }

}
