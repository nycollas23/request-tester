import { Component, OnInit, Input } from '@angular/core';
import { ServicePod } from '../shared/models/service-pod.model';
import { StatusTimeSettings } from '../shared/models/status-time-settings.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input()
  pods = new Array<ServicePod>();

  @Input()
  separateTimes = new StatusTimeSettings();

  @Input()
  countRequests: number;


  dataChart = new Array<number>(4);

  pieChartColors: Array < any > = [{
    backgroundColor: ['#8af55f', '#FFCE56', '#FF6384', '#E7E9ED'],
  }];

  pieChartLabels: string[] = ['Tempo Ideal', 'Tempo Médio', 'Tempo Ruim', 'Inaceitavel'];
  pieChartType = 'pie';

  chartOptions = {
    responsive: true
  };

  private bestTimeCount = 0;
  private mediumTimeCount = 0;
  private badTimeCount = 0;
  private noTimeCount = 0;

  constructor() { }

  ngOnInit() {
  }

  private separeteValues(): void {
    this.pods.forEach((pod: ServicePod) => {

      if (pod.getAverageTimeResponse() > 0 ) {
        if (pod.getAverageTimeResponse() >= this.separateTimes.bestTimeRangeMinimum &&
          pod.getAverageTimeResponse() <= this.separateTimes.bestTimeRangeMaximum) {
          this.bestTimeCount++;
        } else if (pod.getAverageTimeResponse() > this.separateTimes.bestTimeRangeMaximum &&
          pod.getAverageTimeResponse() <= this.separateTimes.mediumTimeRangeMaximum) {
          this.mediumTimeCount++;
        } else {
          if (
            this.separateTimes.badTimeRangeMaximum &&
            pod.getAverageTimeResponse() > this.separateTimes.bestTimeRangeMaximum) {
            this.noTimeCount++;
          } else {
            this.badTimeCount++;
          }
        }

      }

    });

    this.dataChart = [this.bestTimeCount, this.mediumTimeCount, this.badTimeCount, this.noTimeCount];

  }

}
