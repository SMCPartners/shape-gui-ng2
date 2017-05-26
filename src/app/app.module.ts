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
import {HomeService} from './home/home.service';
import { MeasureComponent } from './measure-input/measure.component';
import {ChartsModule} from 'ng2-charts';
import { MeasureChartComponent } from './measure-input/measure-chart.component';
import { PastMeasureReportsComponent } from './past-measure-reports/past-measure-reports.component';
import { ListViewComponent } from './past-measure-reports/list-view/list-view.component';
import { MeasureDemographicsComponent } from './past-measure-reports/measure-dem/measure-demographics.component';
import { AggComparisonComponent } from './past-measure-reports/agg-comparison/agg-comparison.component';
import {PastMeasureService} from "./past-measure-reports/past-measure.service";

const appRoutes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [ RouteProtect ] },
  { path: '404', component: NotfoundComponent },
  { path: '', component: LoginComponent },

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
    AggComparisonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
  ],
  providers: [
    LoginService,
    RouteProtect,
    HomeService,
    PastMeasureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
