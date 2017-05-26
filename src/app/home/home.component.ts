import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Organization } from '../shared/organization';
import {MeasureInfo} from "../shared/measure-info";
import {OrgMeasureDetail} from "../shared/org-measure-detail";

@Component({
  selector: 'sh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  organizations: Organization[] = [];
  measures: MeasureInfo[] = [];
  orgMeasureDetail: OrgMeasureDetail[] = [];
  organizationSelected: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAllOrganizations()
      .subscribe(organization => {
        this.organizations = organization
      });

    this.homeService.findMeasuresByID()
      .subscribe(measure => {
        this.measures = measure;
      });
  }

  onChange(orgId) {

    this.homeService.findAllMeasuresByOrganization(orgId)
      .subscribe(orgMeasureDetail => {
        this.orgMeasureDetail = orgMeasureDetail;
        this.organizationSelected = true;
      });

  }

}
