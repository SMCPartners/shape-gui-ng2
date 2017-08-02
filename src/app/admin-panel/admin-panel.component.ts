import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

declare var jQuery: any;

@Component({
  selector: 'sh-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    const url = this.router.url;

    if (url === '/admin/users') {
      jQuery('#userTab').addClass('active');
    }

    if (url === '/admin/providers') {
      jQuery('#providerTab').addClass('active');
    }

    if (url === '/admin/organizations') {
      jQuery('#organizationTab').addClass('active');
    }

    if (url === '/admin/measures') {
      jQuery('#measuresTab').addClass('active');
    }

  }

  loadUsers() {
    this.router.navigate(['admin/users']);
  }

  loadProviders() {
    this.router.navigate(['admin/providers']);
  }

  loadOrganizations() {
    this.router.navigate(['admin/organizations']);
  }

  loadMeasures() {
    this.router.navigate(['admin/measures']);
  }
}
