import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../login/login.service";
import {User} from "../../shared/user";
import {MyAccountService} from "../my-account.service";
import {ToastrService} from "toastr-ng2";

@Component({
  selector: 'sh-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private loginService: LoginService, private myAcctService: MyAccountService, private toastr: ToastrService) { }
  currentUser: User;
  securityQuestion: string;
  error: string = '';

  model: any = {};

  ngOnInit() {

    this.loginService.getUserByID(this.loginService.getUserID())
      .subscribe(user => {
        this.currentUser = user;

        this.loginService.getSecurityQuestion(this.currentUser.id, this.currentUser.email)
          .subscribe(question => this.securityQuestion = question.randomQuestion);
      });
  }

  resetPassword() {

    this.myAcctService.resetPassword(this.currentUser.id, this.model.oldPassword, this.model.newPassword, this.model.answer)
      .subscribe(response => {
        this.toastr.success('Your password was successfully reset!', 'Success!');
        this.model.oldPassword = '';
        this.model.newPassword = '';
        this.model.answer = '';
        this.error = '';
      }, error => {
        this.error = error.json().errMsg;
      });
  }

}
