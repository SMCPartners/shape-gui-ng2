import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {AggData} from './agg-data';
import {AmChartsService} from '@amcharts/amcharts3-angular';

@Component({
  selector: 'sh-agg-comparison',
  templateUrl: './agg-comparison.component.html',
  styleUrls: ['./agg-comparison.component.css']
})
export class AggComparisonComponent implements OnInit, AfterViewChecked  {

  @Input() aggDatas: AggData[];

  private dataForOrganizations: Array<number> = Array<number>();
  private namesOfOrganizations: Array<string> = Array<string>();

  public chart: any;

  public randomId: string = Math.random().toString(36).substring(7);

  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {

    // let firstTime = true;
    //
    // this.aggDatas.forEach(aggData => {
    //
    //   if (firstTime !== true) {
    //     this.dataForOrganizations.push(+(aggData[2] / aggData[1]).toFixed(2) * 100);
    //     this.namesOfOrganizations.push(aggData[0]);
    //   }
    //   firstTime = false;
    //
    // });
    //
    // this.barChartLabels = this.namesOfOrganizations;
    // this.barChartData.push({ data : this.dataForOrganizations, label: '%' })

  }


  ngAfterViewChecked(): void {

    this.chart = this.AmCharts.makeChart(this.randomId, {
      type : 'serial',
      theme : 'light',
      dataProvider : [ {
        country: 'USA',
        visits: 2025
      }, {
        country: 'China',
        visits: 1882
      }, {
        country: 'Japan',
        visits: 1809
      }, {
        country: 'Germany',
        visits: 1322
      }, {
        country: 'UK',
        visits: 1122
      }, {
        country: 'France',
        visits: 1114
      }, {
        country: 'India',
        visits: 984
      }, {
        country: 'Spain',
        visits: 711
      }, {
        country: 'Netherlands',
        visits: 665
      }, {
        country: 'Russia',
        visits: 580
      }, {
        country: 'South Korea',
        visits: 443
      }, {
        country: 'Canada',
        visits: 441
      }, {
        country: 'Brazil',
        visits: 395
      } ],
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
        valueField: 'visits'
      } ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: 'country',
      categoryAxis: {
        gridPosition: 'start',
        gridAlpha: 0,
        tickPosition: 'start',
        tickLength: 20
      },

    });

  }
}
