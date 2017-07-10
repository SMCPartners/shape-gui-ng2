import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Organization} from "../../shared/organization";
import {AdminPanelService} from "../admin-panel.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../login/login.service";
import {ToastrService} from "toastr-ng2";

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
        title: 'Status',
        filter: false
      }
    }
  };

  constructor(private adminPanelService: AdminPanelService, private fb: FormBuilder,
              private loginService: LoginService, private toastrService: ToastrService) {}

  ngOnInit() {

    this.createForm();

    this.adminPanelService.getAllOrganizations()
      .subscribe(orgs => {
        this.organizations = orgs;
        this.data = Organization.convertToTableObject(this.organizations);
      });

  }

  addOrganization(organization) {

    console.log(this.addOrganizationForm);


    if (organization.valid) {
      const formData = organization.value;
      const addOrganizationForm = new Organization(null, formData.orgName, true, formData.streetAddress, formData.state,
                                      formData.city, formData.zip, '', formData.primaryName,
                                      formData.primaryEmail, formData.primaryRole, formData.primaryPhone,
                                      this.loginService.getUserID(), '', '');

      this.adminPanelService.addOrganization(addOrganizationForm)
        .subscribe(response => {
          this.addOrganizationShown = false;
          this.addOrganizationForm.reset();
          window.scrollTo(0,0);
          this.toastrService.success('Organization added successfully!', 'Success!');

          this.adminPanelService.getAllOrganizations()
            .subscribe(orgs => {
              this.organizations = orgs;
              this.data = Organization.convertToTableObject(this.organizations);
            });
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

    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.addOrganizationForm = this.fb.group({
      orgName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      primaryName: ['', Validators.required],
      primaryEmail: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      primaryPhone: ['', Validators.required],
      primaryRole: ['', Validators.required],
    })

  }

}
