import { appSettings } from './../../app.setting';
import { Board } from './../../types/board.type';
import { BoardUtils } from './../../classes/BoardUtils.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  template: `
  <div class="board-container">
  
    <app-control-calc 
      (downOnLeft)="downOnLeft = true"
      (upOnLeft)="downOnLeft = false"
      (downOnMiddle)="downOnMiddle = true"
      (upOnMiddle)="downOnMiddle = false"
      (downOnRight)="downOnRight = true"
      (upOnRight)="downOnRight = false">
    </app-control-calc>

    <app-board [board]="board">
    </app-board>

  </div>

  <pre class="debug-box">
    {{ board | json}}
  </pre>
  `,
  styleUrls: ['./game.container.scss']
})
export class GameContainer implements OnInit {

  board: Board = BoardUtils.createBoard();

  appSettings = appSettings;

  // inputs
  downOnLeft = false;
  downOnMiddle = false;
  downOnRight = false

  // fps
  updateEveryMs = 1000 / appSettings.fps; 


  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      BoardUtils.moveBoardElements(this.board, this.updateEveryMs, 
        this.downOnLeft ? 'left' : this.downOnRight ? 'right' : null);
    }, this.updateEveryMs)
  }

}
