import {Component, OnDestroy, OnInit} from '@angular/core';
import {Score} from '../shared/score.model';
import {ScoreService} from '../shared/score.service';
import {Subscription} from 'rxjs';
import {ModalText} from '../shared/modal/modal.component';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit, OnDestroy {

  scoreData: Score[];
  private scoreSubscr: Subscription;
  isModalShown = false;
  modalText: ModalText = {
    title: 'Deleting scoreboard',
    body: 'Are you sure you want to delete this scoreboard?'
  };


  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreSubscr = this.scoreService.getScores$().subscribe(
      scoreData => this.scoreData = scoreData
    );
  }

  ngOnDestroy(): void {
    this.scoreSubscr.unsubscribe();
  }

  showModal(event: Event) {
    event.stopPropagation();
    this.isModalShown = true;
  }

  closeModal() {
    this.isModalShown = false;
  }

  submitModal() {
    this.scoreService.clearData();
    this.closeModal();
  }
}
