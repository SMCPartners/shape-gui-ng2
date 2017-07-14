import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions}  from "@angular/http";
import {LoginService} from "../login/login.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {User} from "../shared/user";
import {BASEURL} from "../shared/global-variables";
import {Organization} from "../shared/organization";
import {Provider} from "../shared/provider";
import {MeasureInfo} from "../shared/measure-info";


@Injectable()
export class AdminPanelService {

  constructor(private http: Http, private loginService: LoginService) { }

  getAllUsers(): Observable<User[]> {

    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://${BASEURL}/shape-service/shape/admin/user/findAll`;

    return this.http.get(url, options)
      .map((response: Response) => response.json());

  }

  getAllOrganizations(): Observable<Organization[]> {
    // add authorization header with jwt token
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://${BASEURL}/shape-service/shape/admin/organization/findAll`;

    // get user projects from api
    return this.http.get(url, options)
      .map((response: Response) => response.json());
  }

  getAllProviders(): Observable<Provider[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://${BASEURL}/shape-service/shape/common/provider/findAll`;

    // get user projects from api
    return this.http.get(url, options)
      .map((response: Response) => response.json());
  }

  getAllMeasures(): Observable<MeasureInfo[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://${BASEURL}/shape-service/shape/common/measure/findAll`;

    // get user projects from api
    return this.http.get(url, options)
      .map((response: Response) => response.json());
  }

  addOrganization(newOrganization): Observable<any> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://${BASEURL}/shape-service/shape/common/organization/add`;

    return this.http.post(url, newOrganization, options)
      .map((response: Response) => {
        return response.json();
      });
  }
}
