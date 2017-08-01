import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {User} from "../../shared/user";
import {AdminPanelService} from "../../admin-panel/admin-panel.service";
import {MyAccountService} from "../my-account.service";
import {ToastrService} from "toastr-ng2";

declare var jQuery: any;

@Component({
  selector: 'sh-change-security-questions',
  templateUrl: './change-security-questions.component.html',
  styleUrls: ['./change-security-questions.component.css']
})
export class ChangeSecurityQuestionsComponent implements OnInit, OnChanges {

  model: any = {};
  error: string = '';
  @Input() user: User;

  public securityQuestions: string[] = [
    'Where were you born?',
    'What was the name of your first pet?',
    'What was the name of your elementary school?',
    'What is your mothers maiden name?',
    'What was the make of your first car?',
    'What was the first name of the first person you kissed?'
  ];

  constructor(private loginService: LoginService, private myAccountService: MyAccountService,
              private toastrService: ToastrService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    jQuery('#questionOne').val(0).attr('selected', 'selected');
    jQuery('#questionTwo').val(0).attr('selected', 'selected');
  }

  changeSecurityQuestions() {
    this.myAccountService.changeSecurityQuestions(this.loginService.getUserID(), this.user.organizationId, this.user.role,
      this.user.firstName, this.user.lastName, this.user.email, this.model.answerOne, this.model.answerTwo, this.model.questionOne,
      this.model.questionTwo)
      .subscribe(response => {
        this.toastrService.success('Security questions successfully updated', 'Success!')
        jQuery('#questionOne').val(0).attr('selected', 'selected');
        jQuery('#questionTwo').val(0).attr('selected', 'selected');
        this.model.answerOne = '';
        this.model.answerTwo = '';
      }, error => {
        this.error = error.json().errMsg;
      })
  }

}
