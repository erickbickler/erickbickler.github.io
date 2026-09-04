import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Tool } from 'src/app/Models/tool';

@Component({
    selector: 'app-tool',
    templateUrl: './tool.component.html',
    styleUrls: ['./tool.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ToolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() tool: Tool = new Tool();

}
