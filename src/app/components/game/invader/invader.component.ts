import { appSettings } from './../../../app.setting';
import { Invader } from './../../../types/invader.type';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-invader',
  template: `
  life : {{ invader.life }}
  `,
  styleUrls: ['./invader.component.scss']
})
export class InvaderComponent implements OnInit {

  @Input() invader: Invader;

  @HostBinding('style.width.%') width = appSettings.invader.size['width.%'];
  @HostBinding('style.height.%') height = appSettings.invader.size['height.%'];

  constructor() { }

  ngOnInit() {
  }

}
