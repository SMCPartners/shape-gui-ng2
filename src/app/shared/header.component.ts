import { Component } from '@angular/core';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'sh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private loginService: LoginService) { }

  logout() {
    this.loginService.logout();
  }

}
