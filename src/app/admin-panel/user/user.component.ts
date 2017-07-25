import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {AdminPanelService} from "../admin-panel.service";
import {User} from "../../shared/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Organization} from "../../shared/organization";
import {CreateUser} from "../../shared/create-user";
import {ToastrService} from "toastr-ng2";
import {CustomValidators} from "ng2-validation";

@Component({
  selector: 'sh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  organizations: Organization[] = [];
  data: any[] = [];
  addUserShown: boolean = false;

  addUserForm: FormGroup;


  public settings: {} = {
    delete: {
      confirmDelete: true,
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
        filter: false
      }
    }
  };

  constructor(private adminPanelService: AdminPanelService, private fb: FormBuilder,
              private toastrService: ToastrService) { }

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

  addUser(user) {

    if (user.valid) {

      const formData = user.value;
      const addUserForm = new CreateUser(formData.username, formData.role, null, null, formData.organization,
        formData.firstName, formData.lastName, formData.email, null, null, null, null);

      this.adminPanelService.addUser(addUserForm)
        .subscribe(response => {
          this.addUserShown = false;
          this.addUserForm.reset();
          window.scrollTo(0,0);
          this.toastrService.success('User added successfully!', 'Success!');

          this.adminPanelService.getAllUsers()
            .subscribe(users => {
              this.users = users;
              this.data = User.convertToTableObject(this.users);
            });
        })

    }
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


}
