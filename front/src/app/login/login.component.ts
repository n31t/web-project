import { Component } from '@angular/core';
import { PcService } from '../pc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logged: boolean = false;
  username: string = '';
  password: string = '';
  constructor( private pcService: PcService, private router: Router) {
    this.pcService.logged$.subscribe(logged => {
      this.logged = logged;
    });
  }
  login() {
    this.pcService.login(this.username, this.password).subscribe(
      token => {
        this.logged = true
        this.pcService.setLogged(true);
        localStorage.setItem("access", token.access);
        localStorage.setItem("refresh", token.refresh);
        this.router.navigate(['/main-page']);
        return;
      },
      error => {
        alert("Invalid credentials");
      }
    )
  }
  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.pcService.setLogged(false);
  }

}
