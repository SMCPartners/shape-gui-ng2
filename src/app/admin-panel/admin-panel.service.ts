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

  headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
  options = new RequestOptions({ headers: this.headers });

  getAllUsers(): Observable<User[]> {

    const url = `${BASEURL}/shape-service/shape/admin/user/findAll`;

    return this.http.get(url, this.options)
      .map((response: Response) => response.json());

  }

  getAllOrganizations(): Observable<Organization[]> {

    const url = `${BASEURL}/shape-service/shape/admin/organization/findAll`;

    // get user projects from api
    return this.http.get(url, this.options)
      .map((response: Response) => response.json());
  }

  getAllProviders(): Observable<Provider[]> {

    const url = `${BASEURL}/shape-service/shape/common/provider/findAll`;

    // get user projects from api
    return this.http.get(url, this.options)
      .map((response: Response) => response.json());
  }

  getAllMeasures(): Observable<MeasureInfo[]> {

    const url = `${BASEURL}/shape-service/shape/common/measure/findAll`;

    // get user projects from api
    return this.http.get(url, this.options)
      .map((response: Response) => response.json());
  }

  addUser(newUser): Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/create/user`;

    return this.http.post(url, newUser, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  addOrganization(newOrganization): Observable<any> {

    const url = `${BASEURL}/shape-service/shape/common/organization/add`;

    return this.http.post(url, newOrganization, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  addProvider(newProvider): Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/provider/add`;

    return this.http.post(url, newProvider, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  editProvider(newData): Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/provider/edit`;

    return this.http.post(url, newData, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  editUser(newData): Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/user/edit`;

    return this.http.post(url, newData, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  editOrganization(newData): Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/organization/edit`;

    return this.http.post(url, newData, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  activateUser(username) : Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/activate/${username}`;

    return this.http.put(url, null, this.options)
      .map((response: Response) => {
        return response.json();
    });
  }

  inactivateUser(username) : Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/inactivate/${username}`;

    return this.http.put(url, null, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  activateProvider(provId) : Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/provider/activate`;

    return this.http.post(url, {entId: provId}, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  inactivateProvider(provId) : Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/provider/inactivate`;

    return this.http.post(url, {entId: provId}, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  activateOrg(orgId) : Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/organization/activate`;

    return this.http.post(url, {entId: orgId}, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  inactivateOrg(orgId) : Observable<any> {

    const url = `${BASEURL}/shape-service/shape/admin/organization/inactivate`;

    return this.http.post(url, {entId: orgId}, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

}


