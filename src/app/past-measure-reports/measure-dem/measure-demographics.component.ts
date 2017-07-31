import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'sh-measure-demographics',
  templateUrl: './measure-demographics.component.html',
  styleUrls: ['./measure-demographics.component.css']
})
export class MeasureDemographicsComponent implements OnChanges {

  @Input() measureDem: any;
  ageData: any[] = [];
  raceData: any[] = [];
  genderData: any[] = [];
  ethnicityData: any[] = [];

  constructor() { }

  ngOnChanges() {

    this.ageData = this.measureDem.ageData;
    this.raceData = this.measureDem.raceData;
    this.genderData = this.measureDem.genderData;
    this.ethnicityData = this.measureDem.ethnicityData;

    for (let i = 0; i < this.raceData.length; i++) {

      if (this.raceData[i][0].includes('African')) {
        this.raceData[i][0] = 'Black';
      }

      if (this.raceData[i][0].includes('Indian')) {
        this.raceData[i][0] = 'NA/Alaskan';
      }

      if (this.raceData[i][0].includes('Hawaiian')) {
        this.raceData[i][0] = 'Hawaiian'
      }

    }


  }

}
