import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { StatusTimeSettings } from '../shared/models/status-time-settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input()
  url: string;

  @Output()
  urlChange = new EventEmitter<string>();

  @Input()
  timeInterval: number;

  @Output()
  timeIntervalChange = new EventEmitter<number>();

  @Input()
  requestServices: number;

  @Output()
  requestServicesChange = new EventEmitter<number>();

  @Input()
  separateTimes = new StatusTimeSettings();

  @Output()
  separateTimesChange = new EventEmitter<StatusTimeSettings>();

  @Input()
  countLoops: number;

  @Output()
  countLoopsChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  changeValue($event): void {
    this.urlChange.emit(this.url);
    this.timeIntervalChange.emit(this.timeInterval);
    this.requestServicesChange.emit(this.requestServices);
    this.separateTimesChange.emit(this.separateTimes);
    this.countLoopsChange.emit(this.countLoops);
  }

}
