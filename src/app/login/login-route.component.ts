import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sh-login-route',
  template: `
  
    <div class="landing-page-background">

      <div class="row">
        <div class="col-md-12">
          <div class="banner">
            <h1 class="headline" style="font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif; font-weight: bold">DPH SHAPE DASHBOARD</h1>
          </div>
        </div>
      </div>
      
      <router-outlet></router-outlet>
        
    </div>
      
    
  `,
})
export class LoginRouteComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.logout();
  }

}
