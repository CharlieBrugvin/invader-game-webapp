import { Board } from './../../types/board.type';
import { BoardUtils } from './../../classes/BoardUtils.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  template: `
  <h1> Game Container </h1>
  <app-board [board]="board">
  </app-board>
  `,
  styleUrls: ['./game.container.scss']
})
export class GameContainer implements OnInit {

  board: Board = BoardUtils.createBoard();

  constructor() {
  }

  ngOnInit() {
  }

}
