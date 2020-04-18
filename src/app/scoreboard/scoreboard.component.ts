import {Component, OnDestroy, OnInit} from '@angular/core';
import {Score} from '../shared/score.model';
import {ScoreService} from '../shared/score.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnDestroy {

  scoreData: Score[];
  scoreSubscr: Subscription;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreSubscr = this.scoreService.getScores$().subscribe(
      scoreData => this.scoreData = scoreData
    );
  }

  ngOnDestroy(): void {
    this.scoreSubscr.unsubscribe();
  }

  handleClearData() {
    this.scoreService.clearData();
  }

}
