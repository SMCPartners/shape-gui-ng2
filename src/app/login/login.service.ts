import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {BASEURL} from "../shared/global-variables";
import {current} from "codelyzer/util/syntaxKind";

@Injectable()
export class LoginService {
  public token: string;
  public username: string;
  constructor(private http: Http,
              private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.userName;
  }

  getUserID() : string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usernameJSON = JSON.stringify(currentUser.username);
    return usernameJSON.replace(/\"/g, "");
  }

  getUserIDBeforeLogin() : string {
    return this.username;
  }

  login(username: string, password: string): Observable<any> {

    const url = `http://${BASEURL}/shape-service/shape/common/authentication`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, password: password }), { headers: headers })
      .map((response: Response) => {
          const data = response.json();

        this.username = username;
        const token = response.json() && response.json().token;
        const resetRequired = response.json() && response.json().resetRequired;
        if (token && !resetRequired) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
        }
          return data;
      });
  }

  logout(): void {
    this.token = null;
    this.username = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

  getSecurityQuestion(username: string, email: string): Observable<any> {
    const url = `http://${BASEURL}/shape-service/shape/common/forgotpassword`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, userEmail: email }), { headers: headers })
      .map((response: Response) => {

        return response.json();
      });
  }

  resetPassword(username: string, question: string, answer: string): Observable<any> {
    const url = `http://${BASEURL}/shape-service/shape/common/user/reset_password`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, question: question, answer: answer }), { headers: headers })
      .map((response: Response) => {

        return response.json();
      });
  }

  changePassword(username: string, currentPassword: string, newPassword: string): Observable<any> {
    const url = `http://${BASEURL}/shape-service/shape/common/changepassword`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ id: username, password: currentPassword, newPassword: newPassword }), { headers: headers })
      .map((response: Response) => {

        return response.json();
      });
  }

}
