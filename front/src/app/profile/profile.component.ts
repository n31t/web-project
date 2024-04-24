import { Component, OnInit } from '@angular/core';
import { PcService } from '../pc.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private pcService: PcService) {

  }
  ngOnInit() {
  }
}
