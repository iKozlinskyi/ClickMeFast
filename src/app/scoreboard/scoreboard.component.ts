import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  scoreData = [
    {username: 'Potato', score: 20},
    {username: 'Banana', score: 8},
    {username: 'Cabbage', score: 15},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
