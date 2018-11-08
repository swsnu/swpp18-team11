import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Option } from '../option';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent implements OnInit {
  @Input() options: Option[];
  @Output() optionChanged: EventEmitter<Option[]> = new EventEmitter<Option[]>();
  constructor() { }

  ngOnInit() {} // option already initialized at specify-order component.

  getOptionByID(id: number): Option {
    return this.options.filter(option => option.id === id)[0];
  }

  decrement(id: number): void {
    const selectedOption = this.getOptionByID(id);
    if (selectedOption.quantity > 0) {
      selectedOption.quantity -= 1;
      selectedOption.total_price -= selectedOption.base_price;
    }
    this.optionChanged.emit(this.options);
    return;
  }
  increment(id: number): void {
    const selectedOption = this.getOptionByID(id);
    if (selectedOption.quantity < selectedOption.max_capacity) {
      selectedOption.quantity += 1;
      selectedOption.total_price += selectedOption.base_price;
    }
    this.optionChanged.emit(this.options);
    return;
  }
  /*
  cancel(): void {
    // TODO
    return;
  }
  confirm(): void {
    // TODO
    return;
  }*/
}
