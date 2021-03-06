import {Injectable, OnInit} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {BASEURL} from "../shared/global-variables";
import {User} from "../shared/user";
import {GlobalService} from "../shared/global.service";
import JWT from 'jwt-client';

@Injectable()
export class LoginService {
  public token: string;
  public username: string;
  public role: string;

  constructor(private http: Http,
              private router: Router, private globalService: GlobalService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.username = currentUser && currentUser.userName;
    this.role = currentUser && currentUser.role;

  }

  getUserID() : string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usernameJSON = JSON.stringify(currentUser.username);
    return usernameJSON.replace(/\"/g, "");
  }

  getUserRole() : string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const roleJSON = JSON.stringify(currentUser.token);
    const token = roleJSON.replace(/\"/g, "");
    const readToken = JWT.read(token);
    return readToken.header.role;
  }

  getUserIDBeforeLogin() : string {
    return this.username;
  }

  login(username: string, password: string): Observable<any> {

    const url = `${BASEURL}/shape-service/shape/common/authentication`;
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
    const url = `${BASEURL}/shape-service/shape/common/forgotpassword`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, userEmail: email }), { headers: headers })
      .map((response: Response) => {

        return response.json();
      });
  }

  resetPassword(username: string, question: string, answer: string): Observable<any> {
    const url = `${BASEURL}/shape-service/shape/common/user/reset_password`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, question: question, answer: answer }), { headers: headers })
      .map((response: Response) => {

        return response.json();
      });
  }

  forgotUsername(email: string): Observable<any> {
    const url = `${BASEURL}/shape-service/shape/common/forgotusername`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ val: email }), { headers: headers })
      .map((response: Response) => {

        return response.json();
      });
  }

  changePassword(username: string, currentPassword: string, newPassword: string): Observable<any> {
    const url = `${BASEURL}/shape-service/shape/common/changepassword`;
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ id: username, password: currentPassword, newPassword: newPassword }), { headers: headers })
      .map((response: Response) => {

        return response.json();
      });
  }

  getUserByID(username: string): Observable<User> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    const url = `${BASEURL}/shape-service/shape/admin/user/find/${username}`;

    return this.http.get(url, options)
      .map((response: Response) => {
        return response.json();
      });
  }

}
