import { Component } from '@angular/core';
import { Game } from '../models';
import { PcService } from '../pc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
        game !: Game;
        id !: number;
        constructor(private pcService: PcService, private route: ActivatedRoute) {
          
        }

        ngOnInit() {
          this.route.paramMap.subscribe(params => {
          const id = Number(params.get('id'));
          this.id = id
          this.pcService.getGame(this.id).subscribe(game => {
            this.game = game;
          });
        });
      }
}
