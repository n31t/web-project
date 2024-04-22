import { Component } from '@angular/core';
import { Game } from '../models';
import { PcService } from '../pc.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  game !: Game;
  id !: number;
  loaded = false;
  searchQuery: string;
  constructor( private pcService: PcService) {
    this.searchQuery = '';
  }

  search() {
    this.loaded = false;
    let formattedSearchQuery = this.searchQuery.replace(/ /g, '_');
    this.pcService.getGameByName(formattedSearchQuery).subscribe(game => {
      this.game = game;
      this.loaded = true;
      console.log(this.game);
    }); 
  }
}
