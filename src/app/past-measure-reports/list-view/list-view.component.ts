import {Component, Input, OnInit} from '@angular/core';
import {ListViewMeasure} from "./list-view-measure";

@Component({
  selector: 'sh-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() listViews: ListViewMeasure[];
  @Input() year: number;

  constructor() { }

  ngOnInit() {



  }

}
