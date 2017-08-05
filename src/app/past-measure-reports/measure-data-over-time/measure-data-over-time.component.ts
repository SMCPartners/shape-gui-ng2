import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'sh-measure-data-over-time',
  templateUrl: './measure-data-over-time.component.html',
  styleUrls: ['./measure-data-over-time.component.css']
})
export class MeasureDataOverTimeComponent implements OnInit, OnChanges {

  @Input() dataOverTime: any;

  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:100}}]
    }
  };

  isDataAvailable: boolean = false;

  public lineChartData: any[] = [];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';



  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {

    this.isDataAvailable = false;
    this.lineChartData.length = 0;
    this.lineChartData = [{data: []}];

    this.lineChartLabels = this.dataOverTime.yearsSpanLst;

    const dataForChart = [];
    dataForChart.length = 0;

    dataForChart.push({ data: this.dataOverTime.aggAvgDataByYear, label: 'Aggregate', fill: false});

    this.dataOverTime.orgsMeasureYearAvgDTOS.forEach(org => {
      const orgDataArrayForChart = { data: [], label: org.orgName, fill: false };
      org.measureYearAvgDTOS.forEach(orgData => {
        if (orgData.doubleVal > 0.0) {
          orgDataArrayForChart.data.push(orgData.doubleVal);
        } else {
          orgDataArrayForChart.data.push(null);
        }
      });
      dataForChart.push(orgDataArrayForChart);
    });

    this.lineChartData = dataForChart;
    this.lineChartData = this.lineChartData.slice();
    this.isDataAvailable = true;

  }

  public chartHovered(e:any):void {
  }

}
