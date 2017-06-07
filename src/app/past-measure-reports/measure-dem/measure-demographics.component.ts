import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sh-measure-demographics',
  templateUrl: './measure-demographics.component.html',
  styleUrls: ['./measure-demographics.component.css']
})
export class MeasureDemographicsComponent implements OnInit {

  @Input() measureDem: any;
  ageData: any[] = [];
  raceData: any[] = [];
  genderData: any[] = [];
  ethnicityData: any[] = [];

  constructor() { }

  ngOnInit() {

    console.log(this.measureDem);

    this.ageData = this.measureDem.ageData;
    this.raceData = this.measureDem.raceData;
    this.genderData = this.measureDem.genderData;
    this.ethnicityData = this.measureDem.ethnicityData;

  }

}
