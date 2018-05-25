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
import { ControlCalcComponent } from './components/game/control-calc/control-calc.component';
import { AmountComponent } from './components/amount/amount.component';

// services
import { AudioService } from './services/audio.service';

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
    LaserShipComponent,
    ControlCalcComponent,
    AmountComponent
  ],
  imports: [
    // modules
    BrowserModule,
    // routes
    RouterModule.forRoot(routes)
  ],
  providers: [ AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
