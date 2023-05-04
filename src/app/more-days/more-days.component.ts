import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../app-routing/routes';
import { Forecast } from '../shared/forecast';
import { MeteoService } from '../services/meteo.service';
import { NoteService } from '../services/note.service';
import { flyIn, spread } from '../animation/animations'
import { icons } from '../shared/icons';

@Component({
  selector: 'app-more-days',
  templateUrl: './more-days.component.html',
  styleUrls: ['./more-days.component.css'],
  animations:[flyIn(), spread()]
})
export class MoreDaysComponent implements OnInit {
  tab;
  prev;
  meteo: Forecast[];
  info;
  icons;
  date: number;
  farenheit:boolean;
  offset= new Date().getTimezoneOffset();
  meteoSubscription: Subscription;
  dateSubscription:Subscription;
  unitSubscription:Subscription;
  constructor(
    private meteoService: MeteoService,
    private route: ActivatedRoute,
    private router:Router,
    private noteService:NoteService,
    ) {
      route.data.subscribe((data) => {
        this.tab = data.tab;
      });
    }

  ngOnInit() {
    this.getDate();
    this.getUnit();
    setTimeout(()=>
   {
    this.getMeteo();
    setTimeout(()=>{
      this.icons=icons
    },200)
  },200
  )
    this.setPrev();
  
  }
  ngOnDestroy() {
    this.meteoSubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
  }
  setPrev() {
    for (let x in routes) {
      if (routes[x].data.tab === this.tab) {
        this.prev = routes[routes[x].data.tab - 2].path;
        let prevNext={
          prev:this.prev,
          next:'moredays',
        }
        this.noteService.putPrevNext(prevNext)
      }
    }
  }
  goLeft() {
    this.router.navigate([this.prev]);
  }
  getUnit(){
    this.unitSubscription=this.meteoService.actualUnit.subscribe((unit)=>
    this.farenheit=unit
    )
  }
  getMeteo() {
    this.meteoSubscription = this.meteoService.selectedMeteo.subscribe(
      (meteo) => {
      if(meteo.list){
        this.info=meteo.city;
        this.meteo = meteo.list.filter((day)=>
          new Date((day.dt+this.offset+meteo.city.timezone)*1000).getHours()>=12 &&
          new Date((day.dt+this.offset+meteo.city.timezone)*1000).getHours()<=14 &&
          new Date((day.dt+this.offset+meteo.city.timezone)*1000).getDay()!=new Date(this.date+(this.offset+meteo.city.timezone)*1000).getDay()
      );
      }
      this.meteoService.putDisplayedMeteo('')
    });
  }
  getDate() {
    this.dateSubscription = this.meteoService.actualdate.subscribe((date) => {
      this.date = date.getTime();
      this.offset = date.getTimezoneOffset() * 60;
    });
  }
}
