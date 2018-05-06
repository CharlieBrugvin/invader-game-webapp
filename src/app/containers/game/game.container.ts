import { Board } from './../../types/board.type';
import { BoardUtils } from './../../classes/BoardUtils.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  template: `
  <h1> Game Container </h1>

  <div class="board-container">
  
    <app-control-calc 
      (mouseDownOnLeft)="mouseDownOnLeft = true"
      (mouseUpOnLeft)="mouseDownOnLeft = false"
      (mouseDownOnMiddle)="mouseDownOnMiddle = true"
      (mouseUpOnMiddle)="mouseDownOnMiddle = false"
      (mouseDownOnRight)="mouseDownOnRight = true"
      (mouseUpOnRight)="mouseDownOnRight = false">
    </app-control-calc>

    <app-board [board]="board">
    </app-board>

  </div>

  <pre>
  debug : 
  mouseDownOnLeft : {{ mouseDownOnLeft }}
  mouseDownOnMiddle : {{ mouseDownOnMiddle }}
  mouseDownOnRight : {{ mouseDownOnRight }}
  </pre>


  `,
  styleUrls: ['./game.container.scss']
})
export class GameContainer implements OnInit {

  board: Board = BoardUtils.createBoard();

  mouseDownOnLeft = false;
  mouseDownOnMiddle = false;
  mouseDownOnRight = false

  constructor() {
  }

  ngOnInit() {
  }

}
