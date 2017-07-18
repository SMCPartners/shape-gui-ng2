import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../login/login.service";
import {MyAccountService} from "../my-account.service";
import {ToastrService} from "toastr-ng2";
import {User} from "../../shared/user";

@Component({
  selector: 'sh-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css']
})
export class EditEmailComponent implements OnInit {

  constructor(private loginService: LoginService, private myAcctService: MyAccountService,
              private toastr: ToastrService) { }

  model: any = {};
  error: string = '';
  user: User;

  ngOnInit() {
    this.loginService.getUserByID(this.loginService.getUserID())
      .subscribe(user => {
        this.user = user;
        this.model.email = user.email;
      })
  }

  editEmail() {
    this.myAcctService.editEmail(this.loginService.getUserID(), this.user.organizationId, this.user.role,
      this.user.firstName, this.user.lastName, this.model.email)
      .subscribe(response => {
        this.toastr.success('Your email was successfully updated!', 'Success!');
        this.error = '';
      }, error => {
        this.error = error.json().errorMsg;
      })
  }



}
