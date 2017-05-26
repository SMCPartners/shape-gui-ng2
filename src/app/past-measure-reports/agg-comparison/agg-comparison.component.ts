import {Component, Input, OnInit} from '@angular/core';
import {AggData} from "./agg-data";

@Component({
  selector: 'sh-agg-comparison',
  templateUrl: './agg-comparison.component.html',
  styleUrls: ['./agg-comparison.component.css']
})
export class AggComparisonComponent implements OnInit {

  @Input() aggDatas: AggData[];

  private dataForOrganizations: Array<number> = Array<number>();
  private namesOfOrganizations: Array<string> = Array<string>();

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    beginAtZero: true,
  };

  public barChartLabels:string[] = [];
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [];

  constructor() { }

  ngOnInit() {

    let firstTime = true;

    this.aggDatas.forEach(aggData => {

      if (firstTime !== true) {
        this.dataForOrganizations.push(+(aggData[2] / aggData[1]).toFixed(2) * 100);
        this.namesOfOrganizations.push(aggData[0]);
      }
      firstTime = false;

    });

    this.barChartLabels = this.namesOfOrganizations;
    this.barChartData = this.dataForOrganizations;

  }

  public chartHovered(e:any):void {
  }

}
