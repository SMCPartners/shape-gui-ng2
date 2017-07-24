import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MeasureInfo} from "../shared/measure-info";
import {HomeService} from "../home/home.service";
import {PastMeasureService} from "./past-measure.service";
import {ListViewMeasure} from "./list-view/list-view-measure";
import {AggData} from "./agg-comparison/agg-data";

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
  public selectedValue;
  public selectedYearValue;

  constructor(private homeService: HomeService, private pastMeasureService: PastMeasureService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.listViewSelected = false;
    this.aggComSelected = false;
    this.measureDemSelected = false;
    this.years = [];

    this.selectedValue = '0';
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
                this.analyticId = '1';

                this.year = this.years[0]

              });

          } else if (this.aggComSelected) {

            this.pastMeasureService.getAggregateComparison(this.measureId, this.years[0])
              .subscribe(aggData => {
                this.aggDatas = aggData;
                this.listViewSelected = false;
                this.aggComSelected = true;
                this.measureDemSelected = false;
                this.analyticId = '2';

                this.year = this.years[0]

              });

          } else if (this.measureDemSelected) {

            this.pastMeasureService.getMeasureDemographics(this.orgId, this.measureId, this.years[0])
              .subscribe(measureDem => {

                this.measureDem = measureDem[0];

                this.listViewSelected = false;
                this.aggComSelected = false;
                this.measureDemSelected = true;
                this.analyticId = '3';

                this.year = this.years[0]

              });
          }
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
    }

  }

  onAnalyticChange(analyticId) {

    if (typeof this.years === 'undefined' || this.years.length < 1 || typeof this.year === 'undefined') {
      this.noYearlyDataForMeasure = true;
      return;
    }

    console.log(this.selectedValue);

    this.analyticId = analyticId;

    switch(analyticId) {

      case '1':

        this.pastMeasureService.getListViewMeasures(this.orgId, this.measureId, this.year)
          .subscribe(listView => {
            this.listViews = listView;
            this.listViewSelected = true;
            this.aggComSelected = false;
            this.measureDemSelected = false;
          });
        break;

      case '2':

        this.pastMeasureService.getAggregateComparison(this.measureId, this.year)
          .subscribe(aggData => {
            this.aggDatas = aggData;
            this.listViewSelected = false;
            this.aggComSelected = true;
            this.measureDemSelected = false;
          });
        break;

      case '3':

        this.pastMeasureService.getMeasureDemographics(this.orgId, this.measureId, this.year)
          .subscribe(measureDem => {

            this.measureDem = measureDem[0];

            this.listViewSelected = false;
            this.aggComSelected = false;
            this.measureDemSelected = true;
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
