import { Component } from '@angular/core';
import { GPU } from '../models';
import { ActivatedRoute } from '@angular/router';
import { PcService } from '../pc.service';

@Component({
  selector: 'app-gpu',
  templateUrl: './gpu.component.html',
  styleUrl: './gpu.component.css'
})
export class GpuComponent {
  gpu !: GPU;
  id !: number;
  constructor( private route: ActivatedRoute, private pcService: PcService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('gpuId'));
      this.id = id
      this.pcService.getGpu(this.id).subscribe(gpu => {
        this.gpu = gpu;
      });
    });
  }
}
