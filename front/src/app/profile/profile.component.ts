import { Component, OnInit } from '@angular/core';
import { PcService } from '../pc.service';
import { CPU, GPU, UserPc } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  pc !: UserPc;
  gpu !: GPU;
  cpu !: CPU;
  logged !: boolean;
  constructor(private pcService: PcService, private router: Router) {
    this.pcService.logged$.subscribe(logged => {
      this.logged = logged;
    });
  }
  ngOnInit() {
    if(!this.logged) {
      this.router.navigate(['/login']);
    }
    this.getUserPc();
  }

  getUserPc() {
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
  deletePc(id : number) {
    this.pcService.deleteUserPc(id).subscribe(() => {
      this.pc = {} as UserPc;
    });
  }
  updatePc(id: number, cpu: number, gpu: number, ram: number, storage: number) {
    if (cpu == 0 || gpu == 0 || ram == 0 || storage == 0) {
      return;
    }
    if(cpu < 0 || gpu < 0 || ram < 0 || storage < 0) {
      return;
    }
    if(cpu ==0)
    {
      cpu = this.pc.cpu_id;
    }
    if(gpu ==0)
    {
      gpu = this.pc.gpu_id;
    }
    if(ram ==0)
    {
      ram = this.pc.ram;
    }
    if(storage ==0)
    {
      storage = this.pc.storage;
    }
    this.pcService.updateUserPc(id, cpu, gpu, ram, storage).subscribe(updatedPc => {
      this.pc = updatedPc;
      this.getUserPc();
    });
  }
  
  createPc(cpu: number, gpu: number, ram: number, storage: number) {
    this.pcService.postUserPc(cpu, gpu, ram, storage).subscribe(newPc => {
      this.pc = newPc;
      this.getUserPc();
    });
  }
}
