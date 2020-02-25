import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { LogComponent } from './log/log.component';
import { MsCheckPipe } from './shared/pipes/ms-check.pipe';
import { PodStatusPipe } from './shared/pipes/pod-status.pipe';
import { RequestTesterComponent } from './request-tester/request-tester.component';
import { ChartsModule } from 'ng2-charts';
import { ReportComponent } from './report/report.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'request-tester', component: RequestTesterComponent },
  { path: 'reports', component: ReportComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    LogComponent,
    MsCheckPipe,
    PodStatusPipe,
    RequestTesterComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
