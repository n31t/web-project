import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PcService } from './pc.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sys-front';
  logged: boolean = false;
  username: string = '';
  password: string = '';
  constructor(private modalService: NgbModal, private pcService: PcService) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  login() {
    this.pcService.login(this.username, this.password).subscribe(
      token => {
        this.logged = true
        localStorage.setItem("access", token.access);
        localStorage.setItem("refresh", token.refresh);
        console.log(token);
      }
    )
  }
  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.logged = false;
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh');
    if (refreshToken) {
      const body = {refresh: refreshToken};
      return this.pcService.refreshToken(refreshToken).subscribe(
        token => {
          localStorage.setItem("access", token.access);
          console.log(token);
        });
    }
    return of(null);
  }

  ngOnInit() {
    const access = localStorage.getItem("access");
    if (access) {
      this.logged = true;
    }
  }


}
