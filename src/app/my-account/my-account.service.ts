import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {BASEURL} from "../shared/global-variables";
import {LoginService} from "../login/login.service";

@Injectable()
export class MyAccountService {

  constructor(private http: Http, private loginService: LoginService) { }

  resetPassword(username: string, oldPassword: string, newPassword: string, answer: string): Observable<any> {

    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://${BASEURL}/shape-service/shape/common/password_change`;

    return this.http.post(url, { userId: username, oldPassword: oldPassword, newPassword: newPassword, questionAnswer: answer }, options)
      .map((response: Response) => {

        return response.json();
      });
  }

  editEmail(username: string, organizationId: number, role: string, firstName: string, lastName: string, email: string): Observable<any> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://${BASEURL}/shape-service/shape/common/account/edit`;

    return this.http.post(url, { id: username, organizationId: organizationId, firstName: firstName, lastName: lastName,
                                  role: role, email: email, active: true }, options)
      .map((response: Response) => {

        return response.json();
      })
  }

}
