import { Component, OnInit } from '@angular/core';
import {Organization} from "../../shared/organization";
import {AdminPanelService} from "../admin-panel.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'sh-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  organizations: Organization[] = [];
  data: any[] = [];
  addOrganizationShown: boolean = false;

  addOrganizationForm: FormGroup;

  public settings: {} = {
    delete: {
      confirmDelete: true,
    },
    hideSubHeader: true,
    columns: {
      name: {
        title: 'Name',
        filter: false
      },
      address: {
        title: 'Address',
        filter: false
      },
      primaryPhone: {
        title: 'Primary Contact Phone',
        filter: false
      },
      primaryName: {
        title: 'Primary Contact Name',
        filter: false
      },
      primaryEmail: {
        title: 'Primary Contact Email',
        filter: false
      },
      primaryRole: {
        title: 'Primary Contact Role',
        filter: false
      },
      status: {
        title: 'Primary Contact Role',
        filter: false
      }
    }
  };

  constructor(private adminPanelService: AdminPanelService, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {

    this.createForm();

    this.adminPanelService.getAllOrganizations()
      .subscribe(orgs => {
        this.organizations = orgs;
        this.data = Organization.convertToTableObject(this.organizations);
      });

  }

  addOrganization(organization) {
    if (organization.valid) {
      const formData = organization.value;
      const addOrganizationForm = new Organization(null, formData.orgName, true, formData.streetAddress, formData.state,
                                      formData.city, formData.zip, '', formData.primaryName, formData.primaryEmail,
                                      formData.primaryRole, formData.primaryPhone, '', this.loginService.getUserID(),
                                      '', '');

      this.adminPanelService.addOrganization(addOrganizationForm)
        .subscribe(response => {
          console.log(response)
        })

    }
  }

  addOrganizationShow() {
    this.addOrganizationShown = true;
  }

  cancelAddOrg() {
    this.addOrganizationShown = false;
  }

  createForm() {
    this.addOrganizationForm = this.fb.group({
      orgName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      primaryName: ['', Validators.required],
      primaryEmail: ['', Validators.required],
      primaryPhone: ['', Validators.required],
      primaryRole: ['', Validators.required],
    })
  }

}
