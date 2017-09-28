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
  isLoginRoute:boolean = true;

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
            this.router.navigate(['login/change-password']);
          } else {
            this.router.navigate(['home']);
          }
        },
        (error) => {
          this.error = error.json().errMsg;
          // if (error.ok === false) {
          //   this.error = 'There is a problem connecting to the server';
          // }
        }
      );
  }

  forgotPassword() {
    this.router.navigate(['login/forgot-password']);
    this.isLoginRoute = false;
  }

  forgotUsername() {
    this.router.navigate(['login/forgot-username']);
    this.isLoginRoute = false;
  }

}
