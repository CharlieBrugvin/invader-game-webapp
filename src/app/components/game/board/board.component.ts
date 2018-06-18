import { SettingService } from './../../../services/setting.service';
import { BoardUtils } from "./../../../classes/BoardUtils.class";
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
                    [style.top.%]="invader['top.%']"
                    [style.width.%]="100">
        </app-invader>
  </div>

  <div class="score">
      <app-amount [amount]="board.score">
      </app-amount>
  </div>
  `,
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  constructor(private settings: SettingService) {}

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
