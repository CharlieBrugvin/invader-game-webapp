import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    
  <div class="title">
  INVADER
  </div>

  
  <div class="button-play" routerLink="/game"> PLAY </div>
  
  <img class="invader" src="./../../assets/game_pictures/invader.png" />
  
  <div class="msg"> the mobile version is coming soon... </div>
  `,
  styleUrls: ['./home.container.scss']
})
export class HomeContainer implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
