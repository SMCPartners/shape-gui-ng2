import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {subscribeOn} from "rxjs/operator/subscribeOn";
import {Router} from "@angular/router";

@Component({
  selector: 'sh-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  username: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.username = this.loginService.getUserID();
  }

  changePassword() {

    console.log(this.username);

    this.loginService.changePassword(this.username, this.model.currentPassword, this.model.newPassword)
      .subscribe(data => this.router.navigate(['']))
  }

}
