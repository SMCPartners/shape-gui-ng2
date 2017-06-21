import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

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

  login(username: string, password: string): Observable<any> {

    const url = 'http://localhost:8080/shape-service/shape/common/login';
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, password: password }), { headers: headers })
      .map((response: Response) => {
          const data = response.json();

        const token = response.json() && response.json().token;
        const resetRequired = response.json() && response.json().resetRequired;
        if (token && !resetRequired) {
          // set token property
          this.token = token;
          this.username = username;
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
    const url = 'http://localhost:8080/shape-service/shape/common/forgotpassword';
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, userEmail: email }), { headers: headers })
      .map((response: Response) => {
        const data = response.json();

        return data;
      });
  }

  resetPassword(username: string, question: string, answer: string): Observable<any> {
    const url = 'http://localhost:8080/shape-service/shape/common/user/reset_password';
    const headers = new Headers({ 'Content-Type' : 'application/json'  });

    return this.http.post(url, JSON.stringify({ userId: username, question: question, answer: answer }), { headers: headers })
      .map((response: Response) => {
        const data = response.json();

        return data;
      });
  }

}
