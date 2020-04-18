import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { LandingComponent } from './landing/landing.component';
import {FormsModule} from '@angular/forms';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ClickOutsideDirective } from './shared/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LandingComponent,
    ScoreboardComponent,
    NavbarComponent,
    ModalComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
