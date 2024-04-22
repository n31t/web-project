import { Component, OnInit } from '@angular/core';
import { Game } from '../models';
import { PcService } from '../pc.service';

@Component({
  selector: 'app-big-text',
  templateUrl: './big-text.component.html',
  styleUrl: './big-text.component.css'
})
export class BigTextComponent implements OnInit{
  games !: Game[];
  loaded = false;

  constructor(private pcService: PcService) { 

  }

  ngOnInit() {
    this.pcService.getGames().subscribe(games => {
      this.games = games;
      this.loaded = true;
    });
  }

}
