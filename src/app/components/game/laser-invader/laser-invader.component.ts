import { appSettings } from './../../../app.setting';
import { Laser } from './../../../types/laser.type';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-laser-invader',
  template:`
  `,
  styleUrls: ['./laser-invader.component.scss']
})
export class LaserInvaderComponent implements OnInit {

  @Input() laser: Laser;

  @HostBinding('style.width.%') width = appSettings.laser_invader.size['width.%'];
  @HostBinding('style.height.%') height = appSettings.laser_invader.size['height.%'];

  constructor() { }

  ngOnInit() {
  }

}
