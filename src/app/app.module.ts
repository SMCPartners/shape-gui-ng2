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
import {HomeService} from "./home/home.service";
import { MeasureComponent } from './measures/measure.component';

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
    MeasureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LoginService,
    RouteProtect,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
