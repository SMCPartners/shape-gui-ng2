import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from "@angular/router";
import {GlobalService} from "./global.service";
import {User} from "./user";
import {AdminRouteProtect} from "../route-protect/admin-route-protect";

@Component({
  selector: 'sh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdminPanelAllowed: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private globalService: GlobalService) { }

  ngOnInit() {

    const role = this.loginService.getUserRole();

    // if (role === 'ADMIN' || role === 'ORG_ADMIN') {
    //   this.isAdminPanelAllowed = true;
    // }

    if (role === 'ADMIN') {
        this.isAdminPanelAllowed = true;
      }

  }

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
