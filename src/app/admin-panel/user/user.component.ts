import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {AdminPanelService} from "../admin-panel.service";
import {User} from "../../shared/user";

@Component({
  selector: 'sh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  data: any[] = [];

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

  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {

    this.adminPanelService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        this.data = User.convertToTableObject(this.users);
      });

  }

}
