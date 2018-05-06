// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

// routes
const routes: Routes = [
  { path: '', component: HomeContainer },
  { path: 'game', component: GameContainer },
  { path: 'score', component: ScoreContainer }
 ];

// containers
import { AppComponent } from './app.component';
import { HomeContainer } from './containers/home/home.container';
import { GameContainer } from './containers/game/game.container';
import { ScoreContainer } from './containers/score/score.container';

// components
import { BoardComponent } from './components/game/board/board.component';
import { InvaderComponent } from './components/game/invader/invader.component';
import { LaserComponent } from './components/game/laser/laser.component';
import { ShipComponent } from './components/game/ship/ship.component';

@NgModule({
  declarations: [
    // containers
    AppComponent,
    HomeContainer,
    GameContainer,
    ScoreContainer,
    // components
    BoardComponent,
    InvaderComponent,
    LaserComponent,
    ShipComponent
  ],
  imports: [
    // modules
    BrowserModule,
    // routes
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
