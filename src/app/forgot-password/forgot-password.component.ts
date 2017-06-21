import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";

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
  data: any = {};

  constructor(private loginService: LoginService) { }

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
    this.loginService.resetPassword(this.model.username, this.data.randomQuestion, this.questionModel.answer)
      .subscribe(data => console.log(data))
  }

}
