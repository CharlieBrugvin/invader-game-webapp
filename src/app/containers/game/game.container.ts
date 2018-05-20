import { RandomUtils } from './../../classes/randomUtils.class';
import { InvaderColumnUtils } from './../../classes/InvaderColumns.class';
import { UserInputs } from './../../types/userInputs.type';
import { appSettings } from './../../app.setting';
import { Board } from './../../types/board.type';
import { BoardUtils } from './../../classes/BoardUtils.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  template: `
  <div class="board-container">
  
    <app-control-calc 
      (downOnLeft)="userInputs.shipMoves = 'left'"
      (upOnLeft)="userInputs.shipMoves = null"

      (downOnMiddle)="userInputs.shipShoot = true"
      (upOnMiddle)="userInputs.shipShoot = false"

      (downOnRight)="userInputs.shipMoves = 'right'"
      (upOnRight)="userInputs.shipMoves = null"
    >
    </app-control-calc>

    <app-board [board]="board">
    </app-board>

  </div>

  <pre class="debug-box">
    <h5>User inputs</h5>
    {{userInputs | json }}
    <h5>Board</h5>
    {{ board | json}}
  </pre>
  `,
  styleUrls: ['./game.container.scss']
})
export class GameContainer implements OnInit {

  board: Board = BoardUtils.init(1);

  appSettings = appSettings;

  // inputs
  downOnLeft = false;
  downOnMiddle = false;
  downOnRight = false

  userInputs: UserInputs = {
    shipMoves: null,
    shipShoot: false
  }

  // fps
  updateEveryMs = 1000 / appSettings.fps; 

  constructor() {
    for (let i = 0; i <100; i++) {
      console.log(RandomUtils.getFloat(0.5,0.7))
    }
  }

  ngOnInit() {
    
    
    setInterval(() => {
      this.board = BoardUtils.updateBoard(this.board, this.updateEveryMs, this.userInputs)
      if (this.userInputs.shipShoot) {
        this.userInputs.shipShoot = false;
      }
    }, this.updateEveryMs)
  }

}
