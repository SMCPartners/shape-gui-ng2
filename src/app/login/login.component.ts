import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {any} from "codelyzer/util/function";

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
        (data: any[]) => this.router.navigate(['home']),
        (error) => this.error = error.json().errMsg
      );
  }

}
