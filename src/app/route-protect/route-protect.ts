import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class RouteProtect implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in, unauthorized message
    this.router.navigate(['notfound']);
    return false;
  }
}
