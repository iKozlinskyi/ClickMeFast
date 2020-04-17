import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameState} from '../shared/game-state.enum';
import {TimerService} from './timer.service';
import {Subscription} from 'rxjs';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {ScoreService} from '../shared/score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  states = GameState;
  currentState: GameState = this.states.INITIAL;
  clicks = 0;
  timerValue: number;
  gameDuration = 10;
  timerSubscription: Subscription;
  currentUser: User;
  userSubscription: Subscription;

  constructor(
    private timerService: TimerService,
    private authService: AuthService,
    private scoreService: ScoreService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService
      .currentUserStream$()
      .subscribe(user => this.currentUser = user);
  }

  handleClick() {
    this.clicks++;
  }

  startGame() {
    this.clicks = 0;
    this.timerSubscription = this.timerService
      .startTimer(this.gameDuration)
      .subscribe(val => {
        this.currentState = this.states.PLAYING;
        this.timerValue = val;
      },
        null,
        this.completeGame.bind(this));
  }

  completeGame() {
    this.currentState = this.states.FINISHED;
    this.scoreService.addScore(this.clicks);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.userSubscription.unsubscribe();
  }

  setInitialGameState() {
    this.currentState = this.states.INITIAL;
    this.clicks = 0;
  }
}
