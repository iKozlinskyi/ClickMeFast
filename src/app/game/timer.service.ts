import { Injectable } from '@angular/core';
import {interval, Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timer$ = interval(1000);

  constructor() { }

  startTimer(duration: number): Observable<number> {
    return this.timer$.pipe(
      startWith(-1),
      take(duration + 1),
      map((v) => (duration - 1) - v)
    );
  }
}
