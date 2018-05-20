import { appSettings } from './../../../app.setting';
import { Invader } from './../../../types/invader.type';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-invader',
  template: `
  <img src="../../../../assets/game_pictures/invader.png" 
       alt="">
  `,
  styleUrls: ['./invader.component.scss']
})
export class InvaderComponent implements OnInit {

  @Input() invader: Invader;

  @HostBinding('style.height.%') height = appSettings.invader['height.%'];

  constructor() { }

  ngOnInit() {
  }

}
