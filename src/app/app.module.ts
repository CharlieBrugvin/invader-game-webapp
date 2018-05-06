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
import { BoardComponent } from './components/game/board/board.component';
import { InvaderComponent } from './components/game/invader/invader.component';
import { ShipComponent } from './components/game/ship/ship.component';
import { LaserInvaderComponent } from './components/game/laser-invader/laser-invader.component';
import { LaserShipComponent } from './components/game/laser-ship/laser-ship.component';

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
    ShipComponent,
    LaserInvaderComponent,
    LaserShipComponent
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
