import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions}  from "@angular/http";
import {LoginService} from "../login/login.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {User} from "../shared/user";


@Injectable()
export class AdminPanelService {

  constructor(private http: Http, private loginService: LoginService) { }

  getAllUsers(): Observable<User[]> {

    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = 'http://localhost:8080/shape-service/shape/admin/user/findAll';

    return this.http.get(url, options)
      .map((response: Response) => response.json());

  }

}
