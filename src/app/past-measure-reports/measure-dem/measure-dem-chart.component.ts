import {AfterViewChecked, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'sh-measure-dem-chart',
  templateUrl: './measure-dem-chart.component.html',
  styleUrls: ['./measure-dem-chart.component.css']
})
export class MeasureDemChartComponent implements OnInit, OnChanges, DoCheck {

  @Input() dataArray: any[] = [];
  private dataForDemographics: string[] = [];
  private namesOfDemographicTypes: string[] = [];

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    beginAtZero: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
          max: 100
        }
      }]
    }
  };

  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';

  public barChartData: any[] = [];

  public chartColors: any[] = [{ backgroundColor: '#3F51B5' }];


  constructor() { }

  ngOnInit() {


  }


  ngOnChanges(): void {

    this.barChartData.length = 0;
    this.dataForDemographics.length = 0;
    this.namesOfDemographicTypes.length = 0;

    this.dataArray.forEach(demData => {
      this.dataForDemographics.push(String(demData[1] * 100));
      this.namesOfDemographicTypes.push(demData[0]);
    });

    this.barChartLabels = this.namesOfDemographicTypes;
    this.barChartData = this.dataForDemographics;

    this.barChartData = this.barChartData.slice();

  }

  ngDoCheck() {

  }

}
