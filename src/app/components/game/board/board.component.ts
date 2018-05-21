import { BoardUtils } from "./../../../classes/BoardUtils.class";
import { appSettings } from "./../../../app.setting";
import { Board } from "./../../../types/board.type";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-board",
  template: `

  <div class="test"></div>

  <!-- lasers  -->
  
  <app-laser-invader *ngFor="let laserInvader of board.elements.lasers.invader" 
    [laser]="laserInvader" 
    [ngStyle]="laserInvader.position">
  </app-laser-invader>

  <app-laser-ship *ngFor="let laserShip of board.elements.lasers.ship" 
    [laser]="laserShip" 
    [ngStyle]="laserShip.position">
  </app-laser-ship>
  
  <!-- ship -->

  <app-ship [ship]="board.elements.ship"
            [ngStyle]="board.elements.ship.position">
  </app-ship>

  <!-- invaders -->

  <div  *ngFor="let column of board.elements.invaders"
        class="invader-columns">

        <app-invader *ngFor="let invader of column" 
                    [invader]="invader" 
                    [style.top.%]="invader['top.%']">
        </app-invader>
  </div>
  `,
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  appSettings = appSettings; // used to import app setting as an attribute

  constructor() {}

  ngOnInit() {}
}
