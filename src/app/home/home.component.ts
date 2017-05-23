import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Organization } from '../shared/organization';
import {MeasureInfo} from "../shared/measure-info";

@Component({
  selector: 'sh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  organizations: Organization[] = [];
  measures: MeasureInfo[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAllOrganizations()
      .subscribe(organization => {
        this.organizations = organization
      });
  }

  onChange() {
    this.homeService.findMeasuresByID()
      .subscribe(measure => {
        console.log(measure);
        //this.measures = measure;
      });
  }

}
