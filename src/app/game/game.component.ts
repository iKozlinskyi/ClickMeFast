import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameState} from '../shared/game-state.enum';
import {TimerService} from './timer.service';
import {Subscription} from 'rxjs';
import {User} from '../shared/user.model';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  states = GameState;
  currentState: GameState = this.states.BEFORE_GAME;
  clicks = 0;
  timerValue: number;
  gameDuration = 3;
  timerSubscription: Subscription;
  currentUser: User;
  userSubscription: Subscription;

  constructor(private timerService: TimerService, private authService: AuthService) {
    this.userSubscription = authService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
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
        () => this.currentState = this.states.FINISHED);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
