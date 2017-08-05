import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LoginService} from "../login/login.service";

@Injectable()
export class RouteProtect implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    console.log('route pro');
    console.log(localStorage.getItem('currentUser'))

    // not logged in, unauthorized message
    this.router.navigate(['notfound']);
    return false;
  }
}
