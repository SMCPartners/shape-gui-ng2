import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Organization} from "../shared/organization";

@Component({
  selector: 'sh-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnChanges {

  @Input() orgSelectedId: number;
  @Input() organizations: Organization[];
  public organizationDetail: Organization;

  constructor() { }

  ngOnChanges() {

    this.organizations.forEach(org => {
      if (org.id === +(this.orgSelectedId)) {
        this.organizationDetail = org
      }
    })
  }

}
