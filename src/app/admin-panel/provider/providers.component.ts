import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Provider} from "../../shared/provider";
import {AdminPanelService} from "../admin-panel.service";
import {LoginService} from "../../login/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Organization} from "../../shared/organization";
import {ToastrService} from "toastr-ng2";
import {CustomValidators} from "ng2-validation";
import {DomSanitizer} from "@angular/platform-browser";

declare var jQuery: any;

@Component({
  selector: 'sh-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit, OnDestroy {

  providers: Provider[] = [];
  data: any[] = [];
  organizations: Organization[] = [];

  addProviderShown: boolean = false;
  addProviderForm: FormGroup;

  listenFunc: Function;

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
        title: 'name',
        filter: false
      },
      npi: {
        title: 'NPI',
        filter: false,
      },
      organization: {
        title: 'Organization',
        filter: false
      },
      status: {
        title: 'Status',
        type: 'html',
        filter: false,
        editable: false,
        valuePrepareFunction: (value) => {
          return this.sanitizer.bypassSecurityTrustHtml(value);
        }
      },
    }
  };


  constructor(private adminPanelService: AdminPanelService, private loginService: LoginService,
              private fb: FormBuilder, private toastrService: ToastrService, private sanitizer: DomSanitizer,
              private renderer: Renderer2, private elementRef: ElementRef) {

    this.listenFunc = renderer.listen(elementRef.nativeElement, 'click', (event) => {

      const eventString = event.target.outerHTML;

      if (event.target.outerHTML.includes('btn btn-success') || event.target.outerHTML.includes('btn btn-danger')) {
        if (eventString.substr(0, 4) === '<but') {

          const provId = eventString.match(/\[(.*?)\]/)[1];

          if (eventString.includes('Active')) {

            this.adminPanelService.inactivateProvider(provId)
              .subscribe(response => {
                jQuery('#providerId' + provId).attr('class', 'btn btn-danger').html('Inactive');
              }, error => {
                toastrService.error('Something went wrong deactivating the user!', 'Uh oh!')
              })
          } else if (eventString.includes ('Inactive')) {
            this.adminPanelService.activateProvider(provId)
              .subscribe(response => {
                jQuery('#providerId' + provId).attr('class', 'btn btn-success').html('Active');
              }, error => {
                toastrService.error('Something went wrong activating the user!', 'Uh oh!')
              })
          }
        }
      }

    })


  }

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
      const addProviderForm = new Provider(null, formData.name, null, formData.npi, null, formData.organizationId, formData.organization);

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

  onEditConfirm(event) {

    const newData = Provider.convertTableObjectToDTO(event.newData);

    this.adminPanelService.editProvider(newData)
      .subscribe(response => {
        this.toastrService.success('Provider edited!', 'Success!');
        event.confirm.resolve();
      },
      error => {
        this.toastrService.error('Oh no! There is something wrong with the data you entered', 'Uh oh!');
      })

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

  ngOnDestroy() {
    this.listenFunc();
  }

}
