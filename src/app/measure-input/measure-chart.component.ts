import { Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'sh-measure-chart',
  templateUrl: './measure-chart.component.html',
  styleUrls: ['./measure-chart.component.css']
})
export class MeasureChartComponent implements OnChanges {

  @Input() numerator: number;
  @Input() denominator: number;

  public chartLabels:string[] = ['Patients in numerator', 'Remainder of patients'];
  public chartData:any[2] = [];
  public chartType:string = 'doughnut';
  public chartColors: any[] = [{ backgroundColor: ['#3F51B5', '#90addd'] }];

  constructor() { }

  ngOnChanges() {

    this.chartData[0] = this.numerator;
    this.chartData[1] = this.denominator;
  }

  public chartHovered(e:any):void {
  }

}
