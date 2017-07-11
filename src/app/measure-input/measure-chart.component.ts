import { AfterViewChecked, Component, Input } from '@angular/core';
import {AmChartsService} from "@amcharts/amcharts3-angular";

@Component({
  selector: 'sh-measure-chart',
  templateUrl: './measure-chart.component.html',
  styleUrls: ['./measure-chart.component.css']
})
export class MeasureChartComponent implements AfterViewChecked {

  @Input() numerator: number;
  @Input() denominator: number;
  public chart: any;
  public randomId: string = Math.random().toString(36).substring(7);


  constructor(private AmCharts: AmChartsService) { }

  ngAfterViewChecked(): void {

    this.chart = this.AmCharts.makeChart(this.randomId, {
      type: "pie",
      theme : "light",
      dataProvider: [ {
        title : "Numerator",
        value : this.numerator,
        color : '#808080'
      }, {
        title : "Denominator",
        value : this.denominator,
        color : '#3f51b5'
      } ],
      titleField : "title",
      valueField : "value",
      labelRadius : 5,
      colorField : "color",

      radius : "42%",
      innerRadius : "60%",
      labelText : "[[title]]",
    });
  }
}
