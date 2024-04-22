import { Component } from '@angular/core';
import { CPU } from '../models';
import { ActivatedRoute } from '@angular/router';
import { PcService } from '../pc.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrl: './cpu.component.css'
})
export class CpuComponent {
  cpu !: CPU;
  id !: number;
  constructor( private route: ActivatedRoute, private pcService: PcService) {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('cpuId'));
      this.id = id
      this.pcService.getCpu(this.id).subscribe(cpu => {
        this.cpu = cpu;
      });
    });
  }
}
