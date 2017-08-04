import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {AdminPanelService} from "../admin-panel.service";
import {User} from "../../shared/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Organization} from "../../shared/organization";
import {CreateUser} from "../../shared/create-user";
import {ToastrService} from "toastr-ng2";
import {CustomValidators} from "ng2-validation";
import {NgProgressService} from "ng2-progressbar";
import {DomSanitizer} from "@angular/platform-browser";
import {LoginService} from "../../login/login.service";

declare var jQuery: any;

@Component({
  selector: 'sh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  users: User[] = [];
  organizations: Organization[] = [];
  data: any[] = [];
  addUserShown: boolean = false;

  listenFunc: Function;

  userCreated: boolean = false;

  addUserForm: FormGroup;

  public settings: {} = {
    edit: {
      confirmSave: true,
    },
    actions: {
      delete: false,
    },
    hideSubHeader: true,
    columns: {
      id: {
        title: 'Username',
        filter: false
      },
      firstName: {
        title: 'First Name',
        filter: false
      },
      lastName: {
        title: 'Last Name',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      role: {
        title: 'Role',
        filter: false
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
      }
    }
  };

  constructor(private adminPanelService: AdminPanelService, private fb: FormBuilder,
              private toastrService: ToastrService, private pService: NgProgressService,
              private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef,
              private loginService: LoginService) {

    this.listenFunc = renderer.listen(elementRef.nativeElement, 'click', (event) => {

      const eventString = event.target.outerHTML;

      if (event.target.outerHTML.includes('btn btn-success') || event.target.outerHTML.includes('btn btn-danger')) {
        if (eventString.substr(0, 4) === '<but') {

          const username = eventString.match(/\[(.*?)\]/)[1];

          if (eventString.includes('Active')) {

            if (username === this.loginService.getUserID()) {
              toastrService.error("You can't deactivate yourself!", 'Uh oh!');
              return;
            }

            this.adminPanelService.inactivateUser(username)
              .subscribe(response => {
                jQuery('#' + username).attr('class', 'btn btn-danger').html('Inactive');
              }, error => {
                toastrService.error('Something went wrong deactivating the user!', 'Uh oh!')
              })
          } else if (eventString.includes ('Inactive')) {
            this.adminPanelService.activateUser(username)
              .subscribe(response => {
                jQuery('#' + username).attr('class', 'btn btn-success').html('Active');
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

    this.adminPanelService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        this.data = User.convertToTableObject(this.users);

        this.adminPanelService.getAllOrganizations()
          .subscribe(orgs => {
            this.organizations = orgs;
          });

      });

  }

  addUserShow() {
    this.addUserShown = true;
  }

  cancelAddUser() {
    this.addUserShown = false;
    this.addUserForm.reset();
  }

  thisClicked(value) {
    console.log(value);
  }

  addUser(user) {

    if (user.valid) {

      const formData = user.value;
      const addUserForm = new CreateUser(formData.username, formData.role, null, null, formData.organization,
        formData.firstName, formData.lastName, formData.email, null, null, null, null);

      this.pService.start();
      this.userCreated = true;

      this.adminPanelService.addUser(addUserForm)
        .subscribe(response => {
          this.pService.done();
          this.addUserShown = false;
          this.addUserForm.reset();
          window.scrollTo(0,0);
          this.userCreated = false;
          this.toastrService.success(`User ${formData.username} added successfully!`, 'Success!');

          this.adminPanelService.getAllUsers()
            .subscribe(users => {
              this.users = users;
              this.data = User.convertToTableObject(this.users);
            });
        }, error => {
          this.pService.done();
          this.userCreated = false;
          this.toastrService.error(`${error.json().errMsg}`, 'Uh oh!')
        })

    }
  }

  onEditConfirm(event) {

    const newData = User.convertTableObjectToDTO(event.newData);

    this.adminPanelService.editUser(newData)
      .subscribe(response => {
          this.toastrService.success(`User ${newData.id} edited!`, 'Success!');
          event.confirm.resolve();
        },
        error => {
          this.toastrService.error('Oh no! There is something wrong with the data you enetered', 'Uh oh!');
        })

  }

  createForm() {

    this.addUserForm = this.fb.group({
      username: ['', Validators.compose([ Validators.required, CustomValidators.rangeLength([4,12]) ])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([ Validators.required, CustomValidators.email ])],
      role: ['', Validators.required],
      organization: ['', Validators.required],
    })

  }

  ngOnDestroy() {
    this.listenFunc();
  }

}
