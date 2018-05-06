import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { GameComponent } from './containers/game/game.component';
import { ScoreComponent } from './containers/score/score.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
