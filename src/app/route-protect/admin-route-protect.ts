import {Injectable, OnInit} from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LoginService} from "../login/login.service";

@Injectable()
export class AdminRouteProtect implements CanActivate, OnInit {


  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {

  }

  canActivate() {

    const role = this.loginService.getUserRole();

    if (typeof role === 'undefined') {
      return;
    }

    if (role === 'ADMIN' || role === 'ORG_ADMIN') {
      return true;
    }

    this.router.navigate(['notfound']);
    return false;
  }
}
