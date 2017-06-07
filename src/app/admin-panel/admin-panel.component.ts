import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'sh-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {



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
