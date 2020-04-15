import { Component, OnInit } from '@angular/core';
import {GameState} from '../shared/game-state.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  states = GameState;
  currentState: GameState = this.states.BEFORE_GAME;
  clicks = 0;
  timerValue = 5;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick() {
    this.clicks++;
  }

  startGame() {
    this.currentState = this.states.PLAYING;
    const intervalId = setInterval(() => {
      this.timerValue--;
      if (this.timerValue === 0) {
        clearInterval(intervalId);
        this.currentState = this.states.FINISHED;
      }
    }, 1000);
  }
}
