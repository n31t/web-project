import { Component, Input } from '@angular/core';
import { CPU, GPU, Game, UserPc } from '../models';
import { PcService } from '../pc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
        game !: Game;
        cpu !: CPU;
        gpu !: GPU;
        id !: number;
        logged : boolean = false;
        pc !: UserPc;
        constructor(private pcService: PcService, private route: ActivatedRoute) {
          
        }

        ngOnInit() {
          this.route.paramMap.subscribe(params => {
          this.pcService.logged$.subscribe(logged => {
            this.logged = logged;
            this.pcService.getUserPc().subscribe(pc => {
              this.pc = pc;
              this.pcService.getGpu(this.pc.gpu_id).subscribe(gpu => {
                this.gpu = gpu;
                console.log(this.gpu);
              });
              this.pcService.getCpu(this.pc.cpu_id).subscribe(cpu => {
                this.cpu = cpu;
              });
            });
          }
          );
          const id = Number(params.get('gameId'));
          this.id = id
          this.pcService.getGame(this.id).subscribe(game => {
            this.game = game;
          });
        });
      }
      meetsAllRequirements(): boolean {
        return this.logged &&
          this.pc.ram >= this.game.recommended_memory &&
          this.pc.storage >= this.game.file_size &&
          new Date(this.cpu.release_date) >= new Date(this.game.recommended_cpu.release_date) &&
          new Date(this.gpu.release_date) >= new Date(this.game.recommended_gpu.release_date);
      }
}
