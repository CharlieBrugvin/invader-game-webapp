import { Ship } from './../../../types/ship.type';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-ship',
  template: `

  <img [src]="'../../../../assets/game_pictures/'+picture" 
        [ngClass]="{
          'ship': true,
          'isGoingRight': !!ship.events['isGoingRight'], 
          'isGoingLeft': !!ship.events['isGoingLeft'],
          'isShooting': !!ship.events['isShooting'],
          'isTouchedByLaser': !!ship.events['isTouchedByLaser'],
          'isCreated': !!ship.events['isCreated'],
          'isDying': ship.life <= 50,
          'isDyingALot': ship.life <= 25
      }" >
  
  <span class="life">
    <app-amount [amount]="ship.life">
    </app-amount>
  </span>

    <!-- TODO make the asset path generic -->
  `,
  styleUrls: ['./ship.component.scss'],

})
export class ShipComponent implements OnInit {

  @Input() ship: Ship;
  
  @HostBinding('style.width.%') width;
  @HostBinding('style.height.%') height;
 

  picture = 'ship.png'

  constructor(private settings: SettingService) {
  }


  ngOnInit() {
    this.width = this.settings.getSettings().ship.size['width.%'];
    this.height = this.settings.getSettings().ship.size['height.%'];
  }

}
