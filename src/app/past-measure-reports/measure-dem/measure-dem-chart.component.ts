import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sh-measure-dem-chart',
  templateUrl: './measure-dem-chart.component.html',
  styleUrls: ['./measure-dem-chart.component.css']
})
export class MeasureDemChartComponent implements OnInit {

  @Input() dataArray: any[] = [];
  private dataForDemographics: Array<number> = Array<number>();
  private namesOfDemographicTypes: Array<string> = Array<string>();

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

    this.dataArray.forEach(demData => {
      this.dataForDemographics.push(demData[1] * 100);
      this.namesOfDemographicTypes.push(demData[0]);
    });

    this.barChartLabels = this.namesOfDemographicTypes;
    this.barChartData.push(this.dataForDemographics);

  }

  public chartHovered(e:any):void {
  }

}
