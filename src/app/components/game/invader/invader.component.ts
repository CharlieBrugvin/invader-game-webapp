import { appSettings } from './../../../app.setting';
import { Invader } from './../../../types/invader.type';
import { Component, OnInit, OnChanges, Input, HostBinding, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-invader',
  template: `
  <img [src]="'../../../../assets/game_pictures/'+picture"
        [ngClass]="{
          'invader': true,
          'isTouchedByLaser': !!invader.events['isTouchedByLaser'], 
          'isKilled': !!invader.events['isKilled']
      }" >

  <img *ngIf="!!invader.events['isKilled']"
       class="explosion"
       src="../../../../assets/game_pictures/event_invader_killed.png">
  `,
  styleUrls: ['./invader.component.scss']
})
export class InvaderComponent implements OnInit, OnChanges {
  
  @HostBinding('style.height.%') height = appSettings.invader['height.%'];

  picture = 'invader.png';

  @Input() invader: Invader;

  constructor() { }

  ngOnInit() {
  }

  // on a new value, check if it is necessary to change the picture
  ngOnChanges(simpleChanges: SimpleChanges) {
    
    const newLife = simpleChanges.invader.currentValue.life;

    if ( newLife  <= 33 ) {
      this.picture = 'invader_very_bad.png'
    } else if ( newLife <= 66) {
      this.picture = 'invader_bad.png'
    } else {
      this.picture = 'invader.png';
    }
  }
}
