import { Component, OnInit } from '@angular/core';
import {Provider} from "../../shared/provider";
import {AdminPanelService} from "../admin-panel.service";
import {LoginService} from "../../login/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Organization} from "../../shared/organization";
import {ToastrService} from "toastr-ng2";
import {CustomValidators} from "ng2-validation";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'sh-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  data: any[] = [];
  organizations: Organization[] = [];

  addProviderShown: boolean = false;
  addProviderForm: FormGroup;


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
      npi: {
        title: 'NPI',
        filter: false
      },
      organization: {
        title: 'Organization',
        filter: false
      },
      status: {
        title: 'Status',
        filter: false
      },
    }
  };

  constructor(private adminPanelService: AdminPanelService, private loginService: LoginService,
              private fb: FormBuilder, private toastrService: ToastrService) {}

  ngOnInit() {

    this.createForm();

    this.adminPanelService.getAllProviders()
      .subscribe(provs => {
        this.providers = provs;
        this.data = Provider.convertToTableObject(this.providers);

        this.adminPanelService.getAllOrganizations()
          .subscribe(orgs => {
            this.organizations = orgs;
          });
      });

  }

  addProviderShow() {
    this.addProviderShown = true;
  }

  cancelProviderAdd() {
    this.addProviderShown = false;
    this.addProviderForm.reset();
  }

  addProvider(prov) {

    if (prov.valid) {

      const formData = prov.value;
      const addProviderForm = new Provider(formData.name, null, formData.npi, null, formData.organization);

      this.adminPanelService.addProvider(addProviderForm)
        .subscribe(response => {
          this.addProviderShown = false;
          this.addProviderForm.reset();
          window.scrollTo(0,0);
          this.toastrService.success('Provider added successfully!', 'Success!');

          this.adminPanelService.getAllProviders()
            .subscribe(providers => {
              this.providers = providers;
              this.data = Provider.convertToTableObject(this.providers);
            });
        })

    }
  }

  createForm() {

    this.addProviderForm = this.fb.group({
      name: ['', Validators.required ],
      npi: ['', Validators.compose([Validators.required, CustomValidators.number])],
      organization: ['', Validators.required],
    });

    this.addProviderForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data);
      });

    this.onValueChanged();

  }

  onValueChanged(data?: any) {

    if (!this.addProviderForm) { return; }
    const form = this.addProviderForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.touched && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'npi': '',
    'organization': '',
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
    },
    'npi': {
      'required': 'NPI is required.',
    },
    'organization' : {
      'required': 'Organization is required.'
    }
  };

}
