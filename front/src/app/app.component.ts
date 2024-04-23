import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PcService } from './pc.service';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sys-front';
  logged: boolean = false;
  subscription: Subscription;
  username: string = '';
  password: string = '';
  constructor(private modalService: NgbModal, private pcService: PcService) {
    this.subscription = this.pcService.logged$.subscribe(logged => {
      this.logged = logged;
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  login() {
    this.pcService.login(this.username, this.password).subscribe(
      token => {
        this.logged = true
        this.pcService.setLogged(true);
        localStorage.setItem("access", token.access);
        localStorage.setItem("refresh", token.refresh);
        console.log(token);
      }
    )
  }
  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.pcService.setLogged(false);
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
      this.pcService.setLogged(true);
    }
  }


}
