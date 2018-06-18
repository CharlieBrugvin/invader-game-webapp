import { SettingService } from './../../../services/setting.service';
import { Laser } from './../../../types/laser.type';
import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-laser-ship',
  template: `
  <img src="../../../../assets/game_pictures/laser_ship.png" 
  alt="">
  `,
  styleUrls: ['./laser-ship.component.scss']
})
export class LaserShipComponent implements OnInit {

  @Input() laser: Laser;

  @HostBinding('style.width.%') width = this.settings.getSettings().laser_ship.size['width.%'];
  @HostBinding('style.height.%') height = this.settings.getSettings().laser_ship.size['height.%'];

  constructor(private settings: SettingService) { }

  ngOnInit() {
  }

}
