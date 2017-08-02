import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login.service";
import {NgProgressService} from "ng2-progressbar";
import {Router} from "@angular/router";

@Component({
  selector: 'sh-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  model: any = {};
  error = '';
  questionModel: any = {};
  questionRecieved: boolean = false;
  loading: boolean = false;
  done: boolean = false;
  data: any = {};

  constructor(private loginService: LoginService, private pService: NgProgressService, private router: Router) { }

  ngOnInit() {
  }

  getSecurityQuestion() {
    this.loginService.getSecurityQuestion(this.model.username, this.model.email)
      .subscribe(data => {
        this.data = data;
        this.questionRecieved = true;
        this.error = '';
      }, (error) => this.error = error.json().errMsg)
  }

  resetPassword() {
    this.loading = true;
    this.pService.start();
    this.loginService.resetPassword(this.model.username, this.data.randomQuestion, this.questionModel.answer)
      .subscribe(data => {
        this.pService.done();
        this.done = true;
        this.loading = false;
      },(error) => {
        this.error = error.json().errMsg;
        this.loading = false;
        this.pService.done();
      })
  }

  backToLogin() {
    this.router.navigate(['']);
  }

}
