import { ShipUtils } from './../../classes/ShipUtils.class';
import { Ship } from './../../types/ship.type';
import { InvaderUtils } from './../../classes/InvaderUtils.class';
import { Invader } from './../../types/invader.type';
import { LaserUtils } from './../../classes/LaserUtils.class';
import { Laser } from './../../types/laser.type';
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
    // tests
    const laser: Laser = {
      position: {
        'top.%': 10,
        'left.%': 10
      },
      speed: 0.02,
      damage: 10,
      exists: true
    }

    const invader: Invader = {
      'top.%': 3,
      speed: 0.05,
      life: 100,
      outside: false
    }

    const ship: Ship = {
      position: {
        'bottom.%': 0,
        'left.%': 0
    },
    speed: 1,
    life: 100
    }

    console.log(ship);
    console.log(ShipUtils.move(ship, 3, 'left'))
  }

  ngOnInit() {
    setInterval(() => {
      BoardUtils.moveBoardElements(this.board, this.updateEveryMs, 
        this.downOnLeft ? 'left' : this.downOnRight ? 'right' : null);
    }, this.updateEveryMs)
  }

}
