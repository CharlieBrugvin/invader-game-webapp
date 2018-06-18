import { SettingService } from './../../../services/setting.service';
import { Laser } from './../../../types/laser.type';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-laser-invader',
  template:`
  <img src="../../../../assets/game_pictures/laser_invader.png" 
  alt="">
  `,
  styleUrls: ['./laser-invader.component.scss']
})
export class LaserInvaderComponent implements OnInit {


  @Input() laser: Laser;

  @HostBinding('style.width.%') width = this.settings.getSettings().laser_invader.size['width.%'];
  @HostBinding('style.height.%') height = this.settings.getSettings().laser_invader.size['height.%'];

  constructor(private settings: SettingService) { }

  ngOnInit() {
  }

}
