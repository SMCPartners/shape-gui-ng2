import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {LoginService} from "../login/login.service";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Organization } from '../shared/organization';
import {MeasureInfo} from "../shared/measure-info";

@Injectable()
export class HomeService {

  constructor(private http: Http, private loginService: LoginService) { }

  getAllOrganizations(): Observable<Organization[]> {
    // add authorization header with jwt token
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = 'http://localhost:8080/shape-service/shape/admin/organization/findAll';

    // get user projects from api
    return this.http.get(url, options)
      .map((response: Response) => response.json());
  }

  findMeasuresByID(): Observable<MeasureInfo[]> {

    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = 'http://localhost:8080/shape-service/shape/common/measure/findAll';

    return this.http.get(url, options)
      .map((response: Response) => response.json());

  }

}
