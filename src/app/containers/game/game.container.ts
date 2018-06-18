import { SettingService } from './../../services/setting.service';
import { AudioService } from "./../../services/audio.service";
import { UserInputs } from "./../../types/userInputs.type";
import { Board } from "./../../types/board.type";
import { BoardUtils } from "./../../classes/BoardUtils.class";
import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game",
  template: `
  <div class="board-container">

    <div class="game-over-calc" *ngIf="board.gameOver">
      <div class="game-over-box">
        <div class="game-over"> GAME OVER </div>
        <div class="final-score"> score: {{ board.score }} </div>
        <div class="play-again-btn"
              (click)="onPlayAgainBtnClick()">
        PLAY AGAIN
        </div>
      </div>
    </div>
  
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
  // init the board with one invader
  board: Board;

  // inputs
  downOnLeft = false;
  downOnMiddle = false;
  downOnRight = false;

  userInputs: UserInputs = {
    shipMoves: null,
    shipShoot: false
  };

  // fps
  updateEveryMs;

  constructor(
    private audioService: AudioService,
    private route: ActivatedRoute,
    @Inject("windowObject") private window: Window,
    private settingService: SettingService
  ) {
    
  }

  ngOnInit() {

    // set the settings
    this.settingService.setSettings('desktop');
    console.log(this.settingService.getSettings());

    this.updateEveryMs = 1000 / this.settingService.getSettings().fps;
    this.board = BoardUtils.init(this.settingService.getSettings(), 1)

    // launch the loop game

    let loopGame = setInterval(() => {
      // we update the board
      this.board = BoardUtils.updateBoard(
        this.settingService.getSettings(),
        this.board,
        this.updateEveryMs,
        this.userInputs
      );

      // we play the songs according to the board events
      this.playAudio(this.board);

      // we erase the inputs
      if (this.userInputs.shipShoot) {
        this.userInputs.shipShoot = false;
      }

      // if game over, we quit
      if (this.board.gameOver) {
        clearInterval(loopGame);
      }
    }, this.updateEveryMs);
  }

  onPlayAgainBtnClick() {
    this.window.location.reload();
  }

  // ----- audio management -----

  private playAudio(board: Board) {
    // if ship is shooting
    if (
      board.elements.ship.events["isShooting"] ===
      this.settingService.getSettings().eventsRemainingTime.ship.isShooting
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
              this.settingService.getSettings().eventsRemainingTime.invader.isShooting
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
              this.settingService.getSettings().eventsRemainingTime.invader.isKilled
          )
      )
    ) {
      this.audioService.playInvaderKilled();
    }
  }
}
