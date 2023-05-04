import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from '../app-routing/routes';
import { MeteoService } from '../services/meteo.service';
import { NoteService } from '../services/note.service';
import { Forecast } from '../shared/forecast';
import { Meteo } from '../shared/meteo';
import { Error } from '../shared/error';
import { icons } from '../shared/icons';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { flyIn, sunrise, sunset, bgInOut, spread } from '../animation/animations';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [flyIn(), sunrise(), sunset(), bgInOut(), spread()],
})
export class HomeComponent {
  meteo: Forecast[] | null;
  city: string;
  faAnglesDown=faAnglesDown
  dark: boolean;
  offset: number;
  today: Forecast[];
  date: number;
  errMess: Error;
  icon: any;
  icons=icons;
  tab: string;
  background:string;
  bg:string;
  actualRoute;
  next;
  prev;
  farenheit: boolean = false;
  unitSubscription: Subscription;
  meteoSubscription: Subscription;
  citySubscription: Subscription;
  drawerSubscription: Subscription;
  errorSubscription: Subscription;
  dateSubscription: Subscription;
  darkSubscription: Subscription;
  bgSubscription: Subscription;
  drawer: MatDrawer;
  info;
  sunrise;
  sunset;
  

  url: string = 'https://openweathermap.org/img/wn/';
  constructor(
    private meteoService: MeteoService,
    private router: Router,
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {
    route.data.subscribe((data) => {
      this.tab = data.tab;
    });
  }
  ngOnDestroy() {
    this.unitSubscription.unsubscribe();
    this.meteoSubscription.unsubscribe();
    this.bgSubscription.unsubscribe();
    this.citySubscription.unsubscribe();
    this.drawerSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
    this.darkSubscription.unsubscribe();


  }
  ngAfterViewInit() {
    this.setPrevNext();
    setTimeout(() => {
      this.getMeteo();
      this.getBg();
      this.getDark();
      this.getDate();
      this.getUnit();
      this.getCity();
      this.getDrawer();
    });
  }
  setPrevNext() {
    for (let x in routes) {
      if (routes[x].data.tab === this.tab) {
        this.next = routes[routes[x].data.tab].path;
        this.prev = routes[routes[x].data.tab - 1].path;
        let prevNext={
          prev:this.prev,
          next:this.next
        }
        this.noteService.putPrevNext(prevNext)
      }
    }
  }
  goLeft() {
    this.drawer.toggle();
  }
  goDown() {
   
    this.router.navigate(['home', 'daydetails']);
  }
  goRight() {
    this.router.navigate([this.next]);
  }
  getCity() {
    this.citySubscription = this.meteoService.actualcity.subscribe((city) => {
      this.city = city;
    });
  }
  getDate() {
    this.dateSubscription = this.meteoService.actualdate.subscribe((date) => {
      this.date = date.getTime();
      this.offset = date.getTimezoneOffset() * 60;
    });
  }
  getBg(){
    this.bgSubscription=this.meteoService.nowDisplayed.subscribe((bg)=>{
      this.bg=bg
    })
  }
  getUnit() {
    this.unitSubscription = this.meteoService.actualUnit.subscribe(
      (unit) => (this.farenheit = unit)
    );
  }
  getMeteo() {
    this.meteoSubscription = this.meteoService.selectedMeteo.subscribe({
      next: (sel) => {
        this.meteo = null;
        this.sunrise = null;
        this.sunset = null;
        this.meteo = sel.list;
        if (this.meteo) {
          if(this.bg!=this.meteo[0].weather[0].main){
          this.background=this.meteo[0].weather[0].main
          this.putDisplayed()
        }
        
         
          this.info = sel.city;
          setTimeout(() => {
            this.sunrise = new Date(this.info.sunrise * 1000).toISOString();
            this.sunset = new Date(this.info.sunset * 1000).toISOString();
            this.icon = icons[this.meteo[0].weather[0].icon];
          });
        }
      },
    });
    this.errorSubscription = this.meteoService.actualError.subscribe(
      (error) => (this.errMess = error)
    );
    
  }
  putDisplayed() {
    this.meteoService.putDisplayedMeteo(this.background);
  }
  getDrawer() {
    this.drawerSubscription = this.meteoService.drawerstate.subscribe(
      (drawer) => (this.drawer = drawer)
    );
  }
  getDark() {
    this.darkSubscription = this.noteService.data.subscribe(
      (dark) => (this.dark = dark)
    );
  }
}