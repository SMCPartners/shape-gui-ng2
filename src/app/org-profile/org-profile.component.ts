import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Organization} from "../shared/organization";
import {HomeService} from "../home/home.service";
import {OrganizationStratification} from "../shared/organization-stratification";

@Component({
  selector: 'sh-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnChanges {

  @Input() orgSelectedId: number;
  @Input() organizations: Organization[];
  public organizationDetail: Organization;
  public orgStrat: OrganizationStratification;
  bestDescribeAttribute: string;
  typeOfStaffArray: string[] = [];
  haveOrgStratData: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnChanges() {

    this.typeOfStaffArray.length = 0;

    this.organizations.forEach(org => {
      if (org.id === +(this.orgSelectedId)) {
        this.organizationDetail = org
      }
    });

    this.homeService.getOrganizationStratificationByOrg(this.orgSelectedId)
      .subscribe(orgStrat => {
        this.orgStrat = orgStrat[0];

        if (typeof this.orgStrat !== 'undefined') {
          this.haveOrgStratData = true;

          this.bestDescribeOrg(this.orgStrat);
          this.typeOfStaff(this.orgStrat);

        } else {
          this.haveOrgStratData = false;
        }

      });
  }

  typeOfStaff(orgStrat: OrganizationStratification) {

    if (orgStrat.physicians) {
      this.typeOfStaffArray.push("Physicians");
    }

    if (orgStrat.nursePrac) {
      this.typeOfStaffArray.push("Nurse Practitioners");
    }

    if (orgStrat.rn) {
      this.typeOfStaffArray.push("RNs");
    }

    if (orgStrat.lpn) {
      this.typeOfStaffArray.push("LPNs");
    }

    if (orgStrat.pa) {
      this.typeOfStaffArray.push("Physician Assistants");
    }

    if (orgStrat.medicalAssist) {
      this.typeOfStaffArray.push("Medical Assistants");
    }

    if (orgStrat.residents) {
      this.typeOfStaffArray.push("Residents");
    }

    if (orgStrat.interns) {
      this.typeOfStaffArray.push("Interns");
    }

    if (orgStrat.communityHealthWorkers) {
      this.typeOfStaffArray.push("Community Health Workers");
    }

    if (orgStrat.trainedMotivationalInterview) {
      this.typeOfStaffArray.push("Trained in motivational interviewing");
    }

  }

  bestDescribeOrg(orgStrat: OrganizationStratification) {

    if (orgStrat.primaryCarePractice) {

      this.bestDescribeAttribute = "Primary Care Practice";
      return;

    } else if (orgStrat.fqhcLookALike) {

      this.bestDescribeAttribute = "FQHC or FQHC look-a-like";
      return;

    } else if (orgStrat.comHealthCenter) {

      this.bestDescribeAttribute = "Community Health Center";
      return;

    } else if (orgStrat.multiSpecPractice) {

      this.bestDescribeAttribute = "Multi-Specialty Practice";
      return;

    } else if (orgStrat.pracConsortium) {

      this.bestDescribeAttribute = "Practice Consortium";
      return;

    } else if (orgStrat.ambulatoryClinic) {

      this.bestDescribeAttribute = "Ambulatory Clinic";
      return;

    } else if (orgStrat.hmo) {

      this.bestDescribeAttribute = "HMO";
      return;

    } else if (orgStrat.aco) {

      this.bestDescribeAttribute = "ACO";
      return;

    } else if (orgStrat.pcmh) {

      this.bestDescribeAttribute = "PCMH";
      return;

    } else if (orgStrat.otherOrgDescrip) {

      this.bestDescribeAttribute = "Other";
      return;

    }

    this.bestDescribeAttribute = "No description available";

  }


}
