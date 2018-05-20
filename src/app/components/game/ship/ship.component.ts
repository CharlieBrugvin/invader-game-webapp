import { appSettings } from './../../../app.setting';
import { Ship } from './../../../types/ship.type';
import { Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ship',
  template: `
    <img [src]="'../../../../assets/game_pictures/'+picture" 
         alt=""
    >
    <!-- TODO make the asset path generic -->
  `,
  styleUrls: ['./ship.component.scss'],

})
export class ShipComponent implements OnInit, OnChanges {

  @Input() ship: Ship;
  
  @HostBinding('style.width.%') width = appSettings.ship.size['width.%'];
  @HostBinding('style.height.%') height = appSettings.ship.size['height.%'];

  picture = 'ship.png'

  constructor() { }

  ngOnInit() {
  }

  // on a new value, check if it is necessary to change the picture
  ngOnChanges(simpleChanges: SimpleChanges) {
    
    const newLife = simpleChanges.ship.currentValue.life

    if ( newLife  <= 33 ) {
      this.picture = 'ship_very_bad.png'
    } else if ( newLife <= 66) {
      this.picture = 'ship_bad.png'
    } else {
      this.picture = 'ship.png';
    }
  }

}
