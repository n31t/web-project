import { Component, OnInit } from '@angular/core';
import { PcService } from '../pc.service';
import { UserPc } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  pc !: UserPc;
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
    });
  }
  deletePc(id : number) {
    this.pcService.deleteUserPc(id).subscribe(() => {
      this.pc = {} as UserPc;
    });
  }
  updatePc(id: number, cpu: number, gpu: number, ram: number, storage: number) {
    this.pcService.updateUserPc(id, cpu, gpu, ram, storage).subscribe(updatedPc => {
      this.pc = updatedPc;
    });
  }
  
  createPc(cpu: number, gpu: number, ram: number, storage: number) {
    this.pcService.postUserPc(cpu, gpu, ram, storage).subscribe(newPc => {
      this.pc = newPc;
    });
  }
}
