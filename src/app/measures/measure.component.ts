import {Component, Input, OnInit} from '@angular/core';
import {OrgMeasureDetail} from "../shared/org-measure-detail";

@Component({
  selector: 'sh-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent implements OnInit {

  @Input() orgMeasureDetail: OrgMeasureDetail[] = [];

  constructor() { }

  ngOnInit() {

  }

}
