import { Component, OnInit, Input } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import { NoteService } from '../services/note.service';
import { Error } from '../shared/error';
import { Chart } from '../shared/chart';
import { Values } from '../shared/values';
import { Forecast } from '../shared/forecast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  dark:boolean;
  city: string = '';
  meteo: any;
  offset=new Date().getTimezoneOffset()*60;
  errMess: Error | null;
  date: Date = new Date();
  farenheit: string;
  unit: boolean;
  chart:Chart[];
  today:Forecast[];
  @Input() drawer;
  drawerState;
  constructor(
    private meteoService: MeteoService,
    private noteService: NoteService
    ) {}

  ngOnInit() {
    this.getInitialCity()
    this.noteService.data.subscribe((dark)=>this.dark=dark)
  }
  ngAfterViewInit(){
   
  }

  onSearch() {
    this.meteoService.putCity(this.city);
    this.meteoService.getMeteo(this.city).subscribe({
      next: (forecast) => {
        this.meteo = forecast;
        this.errMess = null;
        if(this.drawer){
          this.drawer.toggle();
        }
        this.meteoService.putMeteo(this.meteo, this.errMess);
        this.date = new Date();
        this.meteoService.putDate(this.date);
        this.getToday();
        this.generateChart();
      },
      error: (errmess) => {
        this.errMess = errmess;
        this.meteoService.putMeteo(this.meteo, this.errMess);
      },
    });
  }
  onSelect() {
    this.unit = this.farenheit === 'true';
    this.meteoService.putUnit(this.unit);
  }
  getToday(){
    if (this.meteo.list) {
      this.today = this.meteo.list.filter(
        (date) => 
          new Date((date.dt+this.offset+this.meteo.city.timezone) * 1000).getDay() ===
          new Date(this.date.getTime()+(this.offset+this.meteo.city.timezone) * 1000).getDay() ||
          (new Date((date.dt+this.offset+this.meteo.city.timezone)  * 1000).getDay() ===
            (1+ new Date(this.date.getTime()+(this.offset+this.meteo.city.timezone) * 1000).getDay()+7)%7
            &&
            new Date((date.dt+this.offset+this.meteo.city.timezone)  * 1000).getHours() < 9)
      );
    }
  }
  getInitialCity(){
    navigator.geolocation.getCurrentPosition(resp => {
      let lon= Math.round(resp.coords.longitude*100)/100;
      let lat= Math.round(resp.coords.latitude*100)/100;
      this.meteoService.getInitialCity(lat,lon).subscribe((meteo)=>{
      this.city=(meteo['city'].name);
      this.meteoService.putCity(this.city);
      this.meteoService.putDate(this.date);
    this.meteoService.getMeteo(this.city).subscribe((forecast) => {
      this.meteo = forecast;
      this.meteoService.putMeteo(this.meteo, this.errMess);
      this.meteoService.selectedMeteo.subscribe(
        (meteo) => {
          this.meteo = meteo;
          this.getToday();
          this.generateChart();
          this.meteoService.putChart(this.chart)
        }
        );
    }),
      (errmess) => {
        this.errMess = <any>errmess;
      };
      })
  
    },
    err => {
      (err);
    })
  }
  generateChart(){
    this.chart=[
      {
      name:"Degrees",
      series:[]
    }
  ]
    let hour:Values;
    for (let i=0; i< this.today.length;i++){
      hour={
        name:new Date((this.today[i].dt+this.offset+this.meteo.city.timezone)*1000),
        value:Math.round(this.today[i].main.temp)
      }
      this.chart[0].series.push(hour)
    }
  }
}
