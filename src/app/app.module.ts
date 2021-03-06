import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { LogComponent } from './log/log.component';
import { MsCheckPipe } from './shared/pipes/ms-check.pipe';
import { PodStatusPipe } from './shared/pipes/pod-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    LogComponent,
    MsCheckPipe,
    PodStatusPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
