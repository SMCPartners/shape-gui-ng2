import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Organization } from '../shared/organization';

@Component({
  selector: 'sh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  organizations: Organization[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAllOrganizations()
      .subscribe(organization => {
        this.organizations = organization
      });
  }

}
