import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {GameComponent} from './game/game.component';
import {AuthGuard} from './auth/auth.guard';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {NotFoundComponent} from './not-found/not-found.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: LandingComponent},
  {path: 'game', component: GameComponent, canActivate: [AuthGuard]},
  {path: 'scoreboard', component: ScoreboardComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
