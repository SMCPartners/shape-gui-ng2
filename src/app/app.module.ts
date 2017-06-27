import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './not-found-404/notfound.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/home.component';
import { RouteProtect } from './route-protect/route-protect';
import { HeaderComponent } from './shared/header.component';
import { HomeService } from './home/home.service';
import { MeasureComponent } from './measure-input/measure.component';
import { ChartsModule } from 'ng2-charts';
import { MeasureChartComponent } from './measure-input/measure-chart.component';
import { PastMeasureReportsComponent } from './past-measure-reports/past-measure-reports.component';
import { ListViewComponent } from './past-measure-reports/list-view/list-view.component';
import { MeasureDemographicsComponent } from './past-measure-reports/measure-dem/measure-demographics.component';
import { AggComparisonComponent } from './past-measure-reports/agg-comparison/agg-comparison.component';
import { PastMeasureService } from "./past-measure-reports/past-measure.service";
import { MeasureDemChartComponent } from './past-measure-reports/measure-dem/measure-dem-chart.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { AccordionModule } from "ng2-accordion";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HelpComponent } from './help/help.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { UserComponent } from './admin-panel/user/user.component';
import { ProvidersComponent } from './admin-panel/provider/providers.component';
import { OrganizationsComponent } from './admin-panel/organization/organizations.component';
import { MeasuresComponent } from './admin-panel/measure/measures.component';
import { AdminPanelService } from "./admin-panel/admin-panel.service";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {NgProgressModule} from "ng2-progressbar";

const appRoutes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [ RouteProtect ] },
  { path: 'help', component: HelpComponent, canActivate: [ RouteProtect ] },
  { path: 'myAccount', component: MyAccountComponent, canActivate: [ RouteProtect ] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [ RouteProtect ], children: [
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: 'users', component: UserComponent},
      {path: 'providers', component: ProvidersComponent},
      {path: 'organizations', component: OrganizationsComponent},
      {path: 'measures', component: MeasuresComponent},
  ]
  },

  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404'}

];

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MeasureComponent,
    MeasureChartComponent,
    PastMeasureReportsComponent,
    ListViewComponent,
    MeasureDemographicsComponent,
    AggComparisonComponent,
    MeasureDemChartComponent,
    OrgProfileComponent,
    AdminPanelComponent,
    HelpComponent,
    MyAccountComponent,
    UserComponent,
    ProvidersComponent,
    OrganizationsComponent,
    MeasuresComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    AccordionModule,
    Ng2SmartTableModule,
    NgProgressModule
  ],
  providers: [
    LoginService,
    RouteProtect,
    HomeService,
    PastMeasureService,
    AdminPanelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
