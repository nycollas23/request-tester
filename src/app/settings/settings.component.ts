import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  timeRequestMS = 5000;
  requestServices = 1;
  url = 'http://localhost:3000/jobs/';

  constructor() { }

  ngOnInit() {
  }



}
