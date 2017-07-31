import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Organization} from "../../shared/organization";
import {AdminPanelService} from "../admin-panel.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../login/login.service";
import {ToastrService} from "toastr-ng2";
import {CustomValidators} from "ng2-validation";

@Component({
  selector: 'sh-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  organizations: Organization[] = [];
  data: any[] = [];
  addOrganizationShown: boolean = false;

  stateAbbrv: string[] = [
    "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE",
    "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"
  ];


  addOrganizationForm: FormGroup;

  public settings: {} = {
    edit: {
      confirmSave: true,
    },
    actions: {
      delete: false,
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
    this.addOrganizationForm.reset();
  }

  onEditConfirm(event) {

    const newData = Organization.convertTableObjectToDTO(event.newData);

    this.adminPanelService.editOrganization(newData)
      .subscribe(response => {
          this.toastrService.success(`Organization ${newData.name} edited!`, 'Success!');
          event.confirm.resolve();
        },
        error => {
          this.toastrService.error('Oh no! There is something wrong with the data you entered', 'Uh oh!');
        })

  }

  createForm() {

    let phoneRegex = '^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$';
    let zipRegex = '^\\d{5}(-\\d{4})?$';
    let streetRegex: RegExp = /^[A-Za-z0-9\.\-']+\s[A-Za-z0-9\.\-']+\s[A-Za-z0-9\.\-']/;
    let onlyLetters: RegExp = /^[A-Za-z\s\-\.\'']*$/;

    this.addOrganizationForm = this.fb.group({
      orgName: ['', Validators.compose([Validators.required, Validators.pattern(onlyLetters)])],
      streetAddress: ['', Validators.compose([Validators.required, Validators.pattern(streetRegex)])],
      city: ['', Validators.compose([Validators.required, Validators.pattern(onlyLetters)])],
      state: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.pattern(zipRegex)])],
      primaryName: ['', Validators.compose([Validators.required, Validators.pattern(onlyLetters)])],
      primaryEmail: ['', Validators.compose([Validators.required, CustomValidators.email])],
      primaryPhone: ['', Validators.compose([Validators.required, Validators.pattern(phoneRegex)])],
      primaryRole: ['', Validators.required],
    })

  }

}
