import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrgMeasureDetail} from "../shared/org-measure-detail";
import {MeasureInfo} from "../shared/measure-info";
import {OrgMeasureInfo} from "../shared/org-measure-info";

@Component({
  selector: 'sh-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent {

  @Input() orgMeasureDetail: OrgMeasureDetail[] = [];
  @Input() addOrgMeasureShow: boolean;
  @Output() changeAddMeasureBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() measures: MeasureInfo[];
  addOrgMeasureModel: OrgMeasureInfo = new OrgMeasureInfo();

  constructor() { }

  addOrgMeasure() {
    console.log(this.addOrgMeasureModel);
  }

  cancelOrgMeasure() {
    this.changeAddMeasureBoolean.emit(false);
  }
}
