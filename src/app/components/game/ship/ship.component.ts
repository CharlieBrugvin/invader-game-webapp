import { appSettings } from './../../../app.setting';
import { Ship } from './../../../types/ship.type';
import { Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ship',
  template: `

  <img [src]="'../../../../assets/game_pictures/'+picture" 
        [ngClass]="{'isGoingRight': isGoingRight, 
        'isGoingLeft': isGoingLeft,
        'isTouchedByLaser': isTouchedByLaser }" >
  
  <span class="life">
    {{ ship.life }} %
  </span>
  
    <!-- TODO make the asset path generic -->
  `,
  styleUrls: ['./ship.component.scss'],

})
export class ShipComponent implements OnInit, OnChanges {

  @Input() ship: Ship;
  
  @HostBinding('style.width.%') width = appSettings.ship.size['width.%'];
  @HostBinding('style.height.%') height = appSettings.ship.size['height.%'];

  picture = 'ship.png'
  isGoingRight: boolean = false;
  isGoingLeft: boolean = false;
  isTouchedByLaser: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  // on a new value, check if it is necessary to change the picture
  ngOnChanges(simpleChanges: SimpleChanges) {

    const newLeft = simpleChanges.ship.currentValue.position['left.%'];
    const previousLeft = simpleChanges.ship.previousValue ?
                            simpleChanges.ship.previousValue.position['left.%']
                            : null;

    this.isGoingLeft = newLeft < previousLeft;
    this.isGoingRight = newLeft > previousLeft;

    // update picture whith the new life
    
    const newLife = simpleChanges.ship.currentValue.life
    const previousLife = simpleChanges.ship.previousValue ?
              simpleChanges.ship.previousValue.life
              : null;

    this.isTouchedByLaser = newLife < previousLife;

    if ( newLife  <= 33 ) {
      this.picture = 'ship_very_bad.png'
    } else if ( newLife <= 66) {
      this.picture = 'ship_bad.png'
    } else {
      this.picture = 'ship.png';
    }
  }

}
