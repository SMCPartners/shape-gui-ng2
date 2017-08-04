import { Component, OnInit } from '@angular/core';
import {MeasureInfo} from "../../shared/measure-info";
import {AdminPanelService} from "../admin-panel.service";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'sh-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss']
})
export class MeasuresComponent implements OnInit {

  measures: MeasureInfo[] = [];
  data: any[] = [];

  public settings: {} = {
    actions: false,
    hideSubHeader: true,
    columns: {
      nqfId: {
        title: 'NQF ID',
        filter: false
      },
      name: {
        title: 'Name',
        filter: false
      },
      description: {
        title: 'Description',
        filter: false
      },
    }
  };

  constructor(private adminPanelService: AdminPanelService, private loginService: LoginService) {}

  ngOnInit() {

    this.adminPanelService.getAllMeasures()
      .subscribe(measures => {
        this.measures = measures;
        this.data = MeasureInfo.convertToTableObject(this.measures);
      });

  }

}
