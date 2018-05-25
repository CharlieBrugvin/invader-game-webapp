import { AudioService } from "./../../services/audio.service";
import { EventsUtils } from "./../../classes/EventsUtils.class";
import { UserInputs } from "./../../types/userInputs.type";
import { appSettings } from "./../../app.setting";
import { Board } from "./../../types/board.type";
import { BoardUtils } from "./../../classes/BoardUtils.class";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
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
  styleUrls: ["./game.container.scss"]
})
export class GameContainer implements OnInit {
  board: Board = BoardUtils.init(1);

  appSettings = appSettings;

  // inputs
  downOnLeft = false;
  downOnMiddle = false;
  downOnRight = false;

  userInputs: UserInputs = {
    shipMoves: null,
    shipShoot: false
  };

  // fps
  updateEveryMs = 1000 / appSettings.fps;

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    setInterval(() => {
      this.board = BoardUtils.updateBoard(
        this.board,
        this.updateEveryMs,
        this.userInputs
      );
      this.playAudio(this.board);
      if (this.userInputs.shipShoot) {
        this.userInputs.shipShoot = false;
      }
    }, this.updateEveryMs);
  }

  private playAudio(board: Board) {

    // if ship is shooting
    if (
      board.elements.ship.events["isShooting"] ===
      appSettings.eventsRemainingTime.ship.isShooting
    ) {
      this.audioService.playShipShot();
    }
    
    // if invader is shooting
    if (
      !!board.elements.invaders.find(
        column =>
          !!column.find(
            invader =>
              invader.events["isShooting"] ===
              appSettings.eventsRemainingTime.invader.isShooting
          )
      )
    ) {
      this.audioService.playInvaderShot();
    }

    // if invader is killed
    if (
      !!board.elements.invaders.find(
        column =>
          !!column.find(
            invader =>
              invader.events["isKilled"] ===
              appSettings.eventsRemainingTime.invader.isKilled
          )
      )
    ) {
      console.log('is killed')
      this.audioService.playInvaderKilled();
    }
  }
}
