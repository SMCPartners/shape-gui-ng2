import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Organization } from '../shared/organization';
import {MeasureInfo} from "../shared/measure-info";
import {OrgMeasureDetail} from "../shared/org-measure-detail";
import {LoginService} from "../login/login.service";

declare var jQuery: any;


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
  years: number[];
  orgSelectedId: number;
  addOrgMeasureShow: boolean = false;
  canAddOrganizationMeasureData = false;

  constructor(private homeService: HomeService, private loginService: LoginService) { }

  ngOnInit() {
    this.homeService.getAllOrganizations()
      .subscribe(organization => {

        this.organizations = organization;

        this.homeService.findMeasuresByID()
          .subscribe(measure => {
            this.measures = measure;

            this.homeService.setOrgId(this.organizations[0].id);
            this.orgSelectedId = this.organizations[0].id;

            this.homeService.findAllMeasuresByOrganization(this.orgSelectedId)
              .subscribe(orgMeasureDetail => {
                this.orgMeasureDetail = orgMeasureDetail;
                this.organizationSelected = true;
              });

          });

      });

    if (this.loginService.getUserRole() === 'ADMIN') {
      this.canAddOrganizationMeasureData = true;
    }

  }

  onOrganizationChange(orgId) {

    this.homeService.setOrgId(orgId);

    this.orgSelectedId = orgId;

    this.homeService.findAllMeasuresByOrganization(orgId)
      .subscribe(orgMeasureDetail => {
        this.orgMeasureDetail = orgMeasureDetail;
        this.organizationSelected = true;
      });
  }

  addOrgMeasureScreen() {
    this.addOrgMeasureShow = true;
    jQuery('.nav-tabs a[href="#tab_default_1"]').tab('show');

  }

  changeAddOrgMeasureBoolean(event) {
    this.addOrgMeasureShow = event;
  }

}
