import { BoardUtils } from "./../../../classes/BoardUtils.class";
import { appSettings } from "./../../../app.setting";
import { Board } from "./../../../types/board.type";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-board",
  template: `

  <!-- lasers  -->
  
  <app-laser-invader *ngFor="let laserInvader of board.elements.lasers.invader; trackBy: identifyLaser" 
    [laser]="laserInvader" 
    [ngStyle]="laserInvader.position">
  </app-laser-invader>

  <app-laser-ship *ngFor="let laserShip of board.elements.lasers.ship; trackBy: identifyLaser"
    [laser]="laserShip" 
    [ngStyle]="laserShip.position">
  </app-laser-ship>
  
  <!-- ship -->

  <app-ship [ship]="board.elements.ship"
            [ngStyle]="board.elements.ship.position">
  </app-ship>

  <!-- invaders -->

  <div  *ngFor="let column of board.elements.invaders; trackBy: identifyInvaderColumn"
        class="invader-columns">

        <app-invader *ngFor="let invader of column; trackBy: identifyInvader" 
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

  // trackBy functions : all the elements are identified by there indexes in their arrays
  // TODO invaders and lasers could have a uniq id

  identifyLaser(index, item){
    return index;
  }

  identifyInvader(index, item) {
    
    return index;
  }

  identifyInvaderColumn(index, item) {
    return index;
  }
}
