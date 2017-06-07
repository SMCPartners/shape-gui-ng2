import {Component, Input, OnInit} from '@angular/core';
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
export class PastMeasureReportsComponent implements OnInit {

  @Input() measures: MeasureInfo[];
  @Input() orgId: number;
  public listViews: ListViewMeasure[] = [];
  public aggDatas: AggData[] = [];
  public measureDem: any;
  private measureId: number;
  private year: number;
  private years: number[];
  private listViewSelected = false;
  private aggComSelected = false;
  private measureDemSelected = false;

  constructor(private homeService: HomeService, private pastMeasureService: PastMeasureService) { }

  ngOnInit() {
  }

  onMeasureChange(measureId) {

    this.measureId = measureId;

    this.homeService.getMeasureYears(this.orgId, measureId)
      .subscribe(years => {
        this.years = years;
      });
  }

  onYearChange(year) {

    this.year = year;

  }

  onAnalyticChange(analyticId) {

    if (typeof this.years === 'undefined') {
      console.log('nope, no measure selected');
      return;
    }

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

            console.log(this.measureDem);

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
