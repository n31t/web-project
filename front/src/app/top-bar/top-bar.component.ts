import { Component } from '@angular/core';
import { PcService } from '../pc.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  logged !: boolean;
  constructor(private pcService: PcService) {
    this.pcService.logged$.subscribe(logged => {
      this.logged = logged;
    });
  }
  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.pcService.setLogged(false);
  }
}
