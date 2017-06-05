import {Component, Input, OnInit} from '@angular/core';
import {MeasureDem} from "../../shared/measure-dem";

@Component({
  selector: 'sh-measure-demographics',
  templateUrl: './measure-demographics.component.html',
  styleUrls: ['./measure-demographics.component.css']
})
export class MeasureDemographicsComponent implements OnInit {

  @Input() measureDems: MeasureDem[] = [];
  ageData: any[] = [];
  raceData: any[] = [];
  genderData: any[] = [];
  ethnicityData: any[] = [];

  constructor() { }

  ngOnInit() {

    this.measureDems[0].ageData = this.ageData;
    this.measureDems[0].raceData = this.raceData;
    this.measureDems[0].genderData = this.genderData;
    this.measureDems[0].ethnicityData = this.ethnicityData;

  }

}
