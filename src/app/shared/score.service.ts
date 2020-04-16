import { Injectable } from '@angular/core';
import {Score} from './score.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private scoreData: Score[] = [
    new Score('Potato', 15, new Date()),
    new Score('Cabbage', 10, new Date()),
    new Score('Banana', 8, new Date()),
  ];

  private scoreDataChanged$ = new BehaviorSubject<Score[]>(this.scoreData);

  constructor(private authService: AuthService) {
    this.restoreScores();
  }

  getScores$(): Observable<Score[]> {
    return this.scoreDataChanged$.asObservable();
  }

  addScore(score: number): void {
    const newScore = this.createScoreRecord(score);

    this.scoreData = this.getDataWithNewScoreInserted(newScore);
    this.scoreDataChanged$.next([...this.scoreData]);
    this.persistScores();
  }

  private createScoreRecord(score: number): Score {
    const username = this.authService.getCurrentUser().username;
    return new Score(username, score, new Date());
  }

  private getDataWithNewScoreInserted(newScore): Score[] {
    let isPushed = false;

    const modifiedScoreData = this.scoreData.reduce((accum: Score[], scoreRecord) => {
      if (!isPushed && scoreRecord.score <= newScore.score) {
        accum.push(newScore);
        isPushed = true;
      }
      accum.push(scoreRecord);

      return accum;
    }, []);

    if (!isPushed) {
      modifiedScoreData.push(newScore);
    }

    return modifiedScoreData;
  }

  // These methods should better be moved to its own service, but for now I`ll leave it like this
  private persistScores(): void {
    localStorage.setItem('scoreData', JSON.stringify(this.scoreData));
    this.scoreDataChanged$.next([...this.scoreData]);
  }

  private restoreScores(): void {
    const scoreObjects: Score[] = JSON.parse(localStorage.getItem('scoreData') || '[]');
    if (scoreObjects.length > 0) {
      this.scoreData = scoreObjects.map(({username, score, timestamp}) => {
        return new Score(username, score, timestamp);
      });
      this.scoreDataChanged$.next([...this.scoreData]);
    }
  }
}
