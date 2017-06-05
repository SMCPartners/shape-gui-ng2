import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {ListViewMeasure} from "./list-view/list-view-measure";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../login/login.service";
import {AggData} from "./agg-comparison/agg-data";
import {MeasureDem} from "../shared/measure-dem";

@Injectable()
export class PastMeasureService {

  constructor(private http: Http, private loginService: LoginService) { }

  getListViewMeasures(orgId: number, measureId: number, year: number): Observable<ListViewMeasure[]> {

    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://localhost:8080/shape-service/shape/common/show/listView/${orgId}/${measureId}/${year}`;

    return this.http.get(url, options)
      .map((response: Response) => response.json());

  }

  getAggregateComparison(measureId: number, year: number): Observable<AggData[]> {

    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://localhost:8080/shape-service/shape/common/show/aggregateComparison/${measureId}/${year}`;

    return this.http.get(url, options)
      .map((response: Response) => response.json());

  }


  getMeasureDemographics(orgId: number, measureId: number, year: number): Observable<MeasureDem[]>{
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.loginService.token });
    let options = new RequestOptions({ headers: headers });
    const url = `http://localhost:8080/shape-service/shape/common/show/appHistDemographic/${orgId}/${measureId}/${year}`;

    return this.http.get(url, options)
      .map((response: Response) => response.json());
  }

}
