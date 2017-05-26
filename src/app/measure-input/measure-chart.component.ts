import {Component, Input, OnInit} from '@angular/core';
import {OrgMeasureDetail} from "../shared/org-measure-detail";

@Component({
  selector: 'sh-measure-chart',
  templateUrl: './measure-chart.component.html',
  styleUrls: ['./measure-chart.component.css']
})
export class MeasureChartComponent implements OnInit {

  @Input() orgMeasureDetail: OrgMeasureDetail;

  public chartLabels:string[] = ['Patients in numerator', 'Remainder of patients'];
  public chartData:any[2] = [];
  public chartType:string = 'doughnut';
  public chartColors: any[] = [{ backgroundColor: ['#3F51B5', '#90addd'] }];

  constructor() { }

  ngOnInit() {

    this.chartData[0] = this.orgMeasureDetail.orgData.numeratorValue;
    this.chartData[1] = this.orgMeasureDetail.orgData.denominatorValue;
  }

  public chartHovered(e:any):void {
  }

}
