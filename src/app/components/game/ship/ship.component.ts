import { appSettings } from './../../../app.setting';
import { Ship } from './../../../types/ship.type';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-ship',
  template: `
    <img src="../../../../assets/game_pictures/ship.png" 
         alt=""
    >
    <!-- TODO make the asset path generic -->
  `,
  styleUrls: ['./ship.component.scss'],

})
export class ShipComponent implements OnInit {

  @Input() ship: Ship;
  
  @HostBinding('style.width.%') width = appSettings.ship.size['width.%'];
  @HostBinding('style.height.%') height = appSettings.ship.size['height.%'];

  constructor() { }

  ngOnInit() {
  }

}
