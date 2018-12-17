import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from '../option';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent implements OnInit {
  @Input() options: Option[];
  constructor() { }

  ngOnInit() {} // option already initialized at specify-order component.
}
