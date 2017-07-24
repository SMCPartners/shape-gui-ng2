import {AfterViewChecked, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AggData} from './agg-data';
import {AmChartsService} from '@amcharts/amcharts3-angular';

@Component({
  selector: 'sh-agg-comparison',
  templateUrl: './agg-comparison.component.html',
  styleUrls: ['./agg-comparison.component.css']
})
export class AggComparisonComponent implements OnInit, AfterViewChecked, OnDestroy  {

  @Input() aggDatas: AggData[];
  @Input() noYearlyDataForMeasure: boolean;

  // private dataForOrganizations: Array<number> = Array<number>();
  // private namesOfOrganizations: Array<string> = Array<string>();
  private dataForChart: Array<object> = Array<object>();

  public chart: any;

  public randomId: string = Math.random().toString(36).substring(7);

  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {

    let firstTime = true;

    this.aggDatas.forEach(aggData => {

      if (firstTime !== true) {

        this.dataForChart.push({
          organization : aggData[0],
          percent : +(aggData[2] / aggData[1]).toFixed(2) * 100,
          color : '#3f51b5'
        });

        // this.dataForOrganizations.push(+(aggData[2] / aggData[1]).toFixed(2) * 100);
        // this.namesOfOrganizations.push(aggData[0]);
      }
      firstTime = false;

    });

    // this.barChartLabels = this.namesOfOrganizations;
    // this.barChartData.push({ data : this.dataForOrganizations, label: '%' })

  }


  ngAfterViewChecked(): void {

    this.chart = this.AmCharts.makeChart(this.randomId, {
      type : 'serial',
      theme : 'light',
      rotate: true,
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
      categoryField: 'organization',
      categoryAxis: {
        gridPosition: 'start',
        gridAlpha: 0,
        tickPosition: 'start',
        tickLength: 20
      },

    });
  }


  ngOnDestroy(): void {

    this.chart.destroy();

  }
}
