import {AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {MeasureInfo} from "../shared/measure-info";
import {HomeService} from "../home/home.service";
import {PastMeasureService} from "./past-measure.service";
import {ListViewMeasure} from "./list-view/list-view-measure";
import {AggData} from "./agg-comparison/agg-data";

declare var jQuery: any;


@Component({
  selector: 'sh-past-measure-reports',
  templateUrl: './past-measure-reports.component.html',
  styleUrls: ['./past-measure-reports.component.css']
})
export class PastMeasureReportsComponent implements OnInit, OnChanges {

  @Input() measures: MeasureInfo[];
  @Input() orgId: number;
  public listViews: ListViewMeasure[] = [];
  public aggDatas: AggData[] = [];
  public measureDem: any;
  public measureId: number;
  public year: number;
  public years: number[];
  public listViewSelected = false;
  public aggComSelected = false;
  public measureDemSelected = false;
  public noYearlyDataForMeasure = true;
  public analyticId;
  public dataOverTime: any;
  public dataOverTimeSelected: any;

  constructor(private homeService: HomeService, private pastMeasureService: PastMeasureService) {
  }

  ngOnInit() {


  }

  ngOnChanges() {
    this.listViewSelected = false;
    this.aggComSelected = false;
    this.measureDemSelected = false;
    this.dataOverTimeSelected = false;
    this.years = [];

    jQuery('#yearSelect').val(0).attr('selected', 'selected');
    jQuery('#analyticSelect').val(0).attr('selected', 'selected');
    jQuery('#measureSelect').val(0).attr('selected', 'selected');

  }


  onMeasureChange(measureId) {

    this.measureId = measureId;

    this.homeService.getMeasureYears(this.orgId, measureId)
      .subscribe(years => {
        this.years = years;

        if (this.years.length > 0) {

          this.noYearlyDataForMeasure = false;

          if (this.listViewSelected) {

            this.pastMeasureService.getListViewMeasures(this.orgId, this.measureId, this.years[0])
              .subscribe(listView => {
                this.listViews = listView;
                this.listViewSelected = true;
                this.aggComSelected = false;
                this.measureDemSelected = false;
                this.dataOverTimeSelected = false;
                this.analyticId = '1';

              });

          } else if (this.aggComSelected) {

            this.pastMeasureService.getAggregateComparison(this.measureId, this.years[0])
              .subscribe(aggData => {
                this.aggDatas = aggData;
                this.listViewSelected = false;
                this.aggComSelected = true;
                this.measureDemSelected = false;
                this.dataOverTimeSelected = false;
                this.analyticId = '2';

              });

          } else if (this.measureDemSelected) {

            this.pastMeasureService.getMeasureDemographics(this.orgId, this.measureId, this.years[0])
              .subscribe(measureDem => {

                this.measureDem = measureDem[0];

                this.listViewSelected = false;
                this.aggComSelected = false;
                this.measureDemSelected = true;
                this.dataOverTimeSelected = false;
                this.analyticId = '3';

              });
          } else if (this.dataOverTimeSelected) {

            this.pastMeasureService.getDataOverTime(this.measureId)
              .subscribe(dataOverTime => {

                this.dataOverTime.length = 0;

                this.dataOverTime = dataOverTime;

                this.listViewSelected = false;
                this.aggComSelected = false;
                this.measureDemSelected = false;
                this.dataOverTimeSelected = true;
                this.analyticId = '4';

              });

          }

          this.year = this.years[0];
          jQuery('#yearSelect').val(this.years[0]).attr('selected', 'selected');


        } else {

          this.listViews = [];
          this.aggDatas = [];
          this.noYearlyDataForMeasure = true;
        }

      });

  }

  onYearChange(year) {

    this.year = year;

    if (this.listViewSelected) {
      this.pastMeasureService.getListViewMeasures(this.orgId, this.measureId, this.year)
        .subscribe(listView => {
          this.listViews = listView;
        });
    } else if (this.aggComSelected) {
      this.pastMeasureService.getAggregateComparison(this.measureId, this.year)
        .subscribe(aggData => {
          this.aggDatas = aggData;
        });
    } else if (this.measureDemSelected) {

      this.pastMeasureService.getMeasureDemographics(this.orgId, this.measureId, this.year)
        .subscribe(measureDem => {

          this.measureDem = measureDem[0];
        });
    } else if (this.measureDemSelected) {

      this.pastMeasureService.getDataOverTime(this.measureId)
        .subscribe(dataOverTime => {

          this.dataOverTime = dataOverTime;
        });
    }

  }

  onAnalyticChange(analyticId) {

    if (typeof this.years === 'undefined' || this.years.length < 1 || typeof this.year === 'undefined') {
      this.noYearlyDataForMeasure = true;
      return;
    }

    this.analyticId = analyticId;

    switch(analyticId) {

      case '1':

        this.pastMeasureService.getListViewMeasures(this.orgId, this.measureId, this.year)
          .subscribe(listView => {
            this.listViews = listView;
            this.listViewSelected = true;
            this.aggComSelected = false;
            this.measureDemSelected = false;
            this.dataOverTimeSelected = false;

          });
        break;

      case '2':

        this.pastMeasureService.getAggregateComparison(this.measureId, this.year)
          .subscribe(aggData => {
            this.aggDatas = aggData;
            this.listViewSelected = false;
            this.aggComSelected = true;
            this.measureDemSelected = false;
            this.dataOverTimeSelected = false;

          });
        break;

      case '3':

        this.pastMeasureService.getMeasureDemographics(this.orgId, this.measureId, this.year)
          .subscribe(measureDem => {

            this.measureDem = measureDem[0];

            this.listViewSelected = false;
            this.aggComSelected = false;
            this.measureDemSelected = true;
            this.dataOverTimeSelected = false;

          });

        break;

      case '4':

        this.pastMeasureService.getDataOverTime(this.measureId)
          .subscribe(dataOverTime => {

            this.dataOverTime = dataOverTime;

            this.listViewSelected = false;
            this.aggComSelected = false;
            this.measureDemSelected = false;
            this.dataOverTimeSelected = true;
          });

        break;

      default:
        this.listViewSelected = false;
        this.measureDemSelected = false;
        this.aggComSelected = false;
        break;
    }
  }

}
