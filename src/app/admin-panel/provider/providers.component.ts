import { Component, OnInit } from '@angular/core';
import {Provider} from "../../shared/provider";
import {AdminPanelService} from "../admin-panel.service";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'sh-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  data: any[] = [];

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

  constructor(private adminPanelService: AdminPanelService, private loginService: LoginService) {}

  ngOnInit() {

    this.adminPanelService.getAllProviders()
      .subscribe(provs => {
        this.providers = provs;
        this.data = Provider.convertToTableObject(this.providers);
      });

  }

}
