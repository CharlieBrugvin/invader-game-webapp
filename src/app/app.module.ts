// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

// containers
import { AppComponent } from './app.component';
import { HomeContainer } from './containers/home/home.container';
import { GameContainer } from './containers/game/game.container';
import { ScoreContainer } from './containers/score/score.container';

// routes
const routes: Routes = [
  { path: '', component: HomeContainer },
  { path: 'game', component: GameContainer },
  { path: 'score', component: ScoreContainer }
 ];

// components



@NgModule({
  declarations: [
    // containers
    AppComponent,
    HomeContainer,
    GameContainer,
    ScoreContainer
    // components
  ],
  imports: [
    BrowserModule,
    // routes
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
