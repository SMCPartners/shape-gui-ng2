import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  error = '';

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.logout();
  }

  login() {
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
        (data) => {

          if (data.resetRequired) {
            this.router.navigate(['change-password']);
          } else {
            this.router.navigate(['home']);
          }
        },
        (error) => this.error = error.json().errMsg
      );
  }

  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }

}
