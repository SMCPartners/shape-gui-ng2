import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {User} from "../shared/user";

@Component({
  selector: 'sh-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {

    this.loginService.getUserByID(this.loginService.getUserID())
      .subscribe(user => {
        this.user = user;
      })

  }

}
