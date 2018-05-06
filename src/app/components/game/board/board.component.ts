import { appSettings } from './../../../app.setting';
import { Board } from './../../../types/board.type';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  template: `
    
  <!-- ship -->

  <app-ship [ship]="board.elements.ship"
            [ngStyle]="board.elements.ship.position">
  </app-ship>

  <!-- invaders -->

  <app-invader *ngFor="let invader of board.elements.invaders" 
            [invader]="invader" 
            [ngStyle]="invader.position">
  </app-invader>

  <!-- invader lasers  -->

  <app-laser-invader *ngFor="let laserInvader of board.elements.lasers.invader" 
    [laser]="laserInvader" 
    [ngStyle]="laserInvader.position">
  </app-laser-invader>

  <!-- ship lasers  -->

  <app-laser-ship *ngFor="let laserShip of board.elements.lasers.ship" 
    [laser]="laserShip" 
    [ngStyle]="laserShip.position">
  </app-laser-ship>
  `,
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  appSettings = appSettings;  // used to import app setting as an attribute

  constructor() {}

  ngOnInit() {
    console.log(this.board);
  }

}
