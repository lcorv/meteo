import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Chart } from '../shared/chart';
import * as shape from 'd3-shape';
import { icons } from '../shared/icons';
import { MeteoService } from '../services/meteo.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.css']
})
export class DayDetailsComponent implements OnInit {
//display chart
darkSubscription: Subscription;
chartSubscription: Subscription;
curveBasis = shape.curveBasis;
chart: Chart[];
meteo;
today;
date;
offset= new Date().getTimezoneOffset();
icons=icons;
dark:boolean;
view: [number, number] = [0, 300];
legend: boolean = false;
showLabels: boolean = true;
showGridLines = false;
animations: boolean = true;
lineInterpolation = this.curveBasis;
xAxis: boolean = true;
yAxis: boolean = true;
showYAxisLabel: boolean = false;
showXAxisLabel: boolean = false;
xAxisLabel: string = 'Hour';
yAxisLabel: string = 'Temperature';
timeline: boolean = false;

colorScheme = 'vivid';
  constructor(
    private meteoService: MeteoService,
    private noteService: NoteService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.meteoService.actualdate.subscribe((date) => {
      this.date = date.getTime();
      this.offset = date.getTimezoneOffset() * 60;
    });
    this.meteoService.selectedMeteo.subscribe((sel)=>{
      this.meteo=sel;
      this.today = sel.list.filter(
        (date) =>
          new Date(
            (date.dt + this.offset + sel.city.timezone) * 1000
          ).getDay() ===
            new Date(
              this.date + (this.offset + sel.city.timezone) * 1000
            ).getDay() ||
          (new Date(
            (date.dt + this.offset + sel.city.timezone) * 1000
          ).getDay() ===
            (1 +
              new Date(
                this.date + (this.offset + sel.city.timezone) * 1000
              ).getDay() +
              7) %
              7 &&
            new Date(
              (date.dt + this.offset + sel.city.timezone) * 1000
            ).getHours() < 9)
      );
    })
    this.chartSubscription = this.meteoService.actualChart.subscribe(
      (chart) => {
        this.chart = chart;
        if(chart && chart[0].series.length>0){
        this.view[0] = chart[0].series.length * 94;
        }
      }
    );
  }
  ngOndestroy(){
    this.chartSubscription.unsubscribe();
  }
  goUp(){
    this.router.navigate(['home'])
  }
  getDark(){
    this.noteService.data.subscribe((dark)=>this.dark=dark)
  }
}