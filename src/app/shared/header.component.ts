import { Component } from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'sh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout();
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToAdminPanel() {
    this.router.navigate(['admin']);
  }

  goToHelpScreen() {
    this.router.navigate(['help']);
  }

  goToMyAccountScreen() {
    this.router.navigate(['myAccount']);
  }


}
