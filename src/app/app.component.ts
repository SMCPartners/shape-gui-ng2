import {Component, DoCheck} from '@angular/core';

@Component({
  selector: 'sh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  isLoggedOn: boolean = false;

  ngDoCheck() {
    if (localStorage.getItem('currentUser')) {
      this.isLoggedOn = true;
    } else {
      this.isLoggedOn = false;
    }
  }
}
