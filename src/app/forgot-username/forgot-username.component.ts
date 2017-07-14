import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {NgProgressService} from "ng2-progressbar";
import {Router} from "@angular/router";

@Component({
  selector: 'sh-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent implements OnInit {

  model: any = {};

  loading: boolean = false;
  done: boolean = false;

  error: string = '';

  constructor(private loginService: LoginService, private pService: NgProgressService,
              private router: Router) { }

  ngOnInit() {
  }

  getUsername() {
    this.pService.start();
    this.loading = true;
    this.loginService.forgotUsername(this.model.email)
      .subscribe(response => {
        this.pService.done();
        this.done = true;
      }, (error) => {
        this.error = error.json().errMsg;
        this.loading = false;
        this.pService.done();
      })
  }

  backToLogin() {
    this.router.navigate(['']);
  }

}
