import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {AmChartsService} from "@amcharts/amcharts3-angular";

@Component({
  selector: 'sh-measure-dem-chart',
  templateUrl: './measure-dem-chart.component.html',
  styleUrls: ['./measure-dem-chart.component.css']
})
export class MeasureDemChartComponent implements OnInit, AfterViewChecked {

  @Input() dataArray: any[] = [];

  public chart: any;
  private dataForChart: Array<object> = Array<object>();
  public randomId: string = Math.random().toString(36).substring(7);

  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {

    this.dataArray.forEach(demData => {

      this.dataForChart.push({
        demographic : demData[0],
        percent : demData[1] * 100,
        color : '#3f51b5'
      });

    });

  }

  ngAfterViewChecked(): void {

    this.chart = this.AmCharts.makeChart(this.randomId, {
      type : 'serial',
      theme : 'light',
      dataProvider : this.dataForChart,
      valueAxes: [ {
        gridColor: '#FFFFFF',
        gridAlpha: 0.2,
        dashLength: 0
      } ],
      gridAboveGraphs: true,
      startDuration: 1,
      graphs: [ {
        balloonText: '[[category]]: <b>[[value]]</b>',
        fillAlphas: 0.8,
        lineAlpha: 0.2,
        type: 'column',
        valueField: 'percent',
        colorField : 'color'
      } ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: 'demographic',
      categoryAxis: {
        gridPosition: 'start',
        gridAlpha: 0,
        labelRotation: 10,
        tickPosition: 'start',
        tickLength: 20
      },

    });
  }

}
