import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.scss']
})
export class ColumnListComponent {
  @Input() values: number[] = []
}
