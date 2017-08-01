import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { MeasureChartComponent } from './measure-input/measure-chart.component';
import { PastMeasureReportsComponent } from './past-measure-reports/past-measure-reports.component';
import { ListViewComponent } from './past-measure-reports/list-view/list-view.component';
import { MeasureDemographicsComponent } from './past-measure-reports/measure-dem/measure-demographics.component';
import { AggComparisonComponent } from './past-measure-reports/agg-comparison/agg-comparison.component';
import { PastMeasureService } from "./past-measure-reports/past-measure.service";
import { MeasureDemChartComponent } from './past-measure-reports/measure-dem/measure-dem-chart.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
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
import { NgProgressModule } from "ng2-progressbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "toastr-ng2";
import { ForgotUsernameComponent } from './forgot-username/forgot-username.component';
import { ResetPasswordComponent } from './my-account/reset-password/reset-password.component';
import { MyAccountService } from "./my-account/my-account.service";
import { EditEmailComponent } from './my-account/edit-email/edit-email.component';
import { FileDropDirective, FileSelectDirective } from "ng2-file-upload";
import { CustomFormsModule } from "ng2-validation";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ChartsModule} from "ng2-charts";
import { ChangeSecurityQuestionsComponent } from './my-account/change-security-questions/change-security-questions.component';

const appRoutes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-username', component: ForgotUsernameComponent },
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
    ChangePasswordComponent,
    ForgotUsernameComponent,
    ResetPasswordComponent,
    EditEmailComponent,
    FileDropDirective,
    FileSelectDirective,
    ChangeSecurityQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    Ng2SmartTableModule,
    NgProgressModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartsModule,
    CustomFormsModule,
    NgxDatatableModule
  ],
  providers: [
    LoginService,
    RouteProtect,
    HomeService,
    PastMeasureService,
    AdminPanelService,
    MyAccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
