import { Laser } from './../../../types/laser.type';
import { appSettings } from './../../../app.setting';
import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-laser-ship',
  template: `
  `,
  styleUrls: ['./laser-ship.component.scss']
})
export class LaserShipComponent implements OnInit {

  @Input() laser: Laser;

  @HostBinding('style.width.%') width = appSettings.laser_ship.size['width.%'];
  @HostBinding('style.height.%') height = appSettings.laser_ship.size['height.%'];

  constructor() { }

  ngOnInit() {
  }

}
