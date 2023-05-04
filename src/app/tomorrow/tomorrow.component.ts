import { Component, OnInit } from '@angular/core';
import { Meteo } from '../shared/meteo';
import { routes } from '../app-routing/routes';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from '../shared/forecast';
import { PrevNext } from '../shared/prevnext';
import { icons } from '../shared/icons';
import { NoteService } from '../services/note.service';
import { MeteoService } from '../services/meteo.service';
import { flyIn, spread } from '../animation/animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tomorrow',
  templateUrl: './tomorrow.component.html',
  styleUrls: ['./tomorrow.component.scss'],
  animations: [flyIn(), spread()],
})
export class TomorrowComponent implements OnInit {
  meteo;
  tomorrow: Forecast;
  background: string;
  bg: string;
  dark: boolean;
  city: string;
  date: number;
  offset: number;
  icon: string;
  next;
  prev;
  tab;
  farenheit: boolean;
  unitSubscription: Subscription;
  meteoSubscription: Subscription;
  bgSubscription: Subscription;
  citySubscription: Subscription;
  drawerSubscription: Subscription;
  errorSubscription: Subscription;
  dateSubscription: Subscription;
  url: string = 'https://openweathermap.org/img/wn/';
  constructor(
    private router: Router,
    private noteService: NoteService,
    private meteoService: MeteoService,
    private route: ActivatedRoute
  ) {
    route.data.subscribe((data) => {
      this.tab = data.tab;
    });
  }

  ngOnInit() {
    this.getBg();
    this.getDark();
    this.getCity();
    this.setPrevNext();
    this.getDate();
    setTimeout(() => {
      this.getMeteo();
      this.getUnit();
    },);
  }
  ngOnDistroy() {
    this.unitSubscription.unsubscribe();
    this.meteoSubscription.unsubscribe();
    this.citySubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
    this.bgSubscription.unsubscribe();
  }
  getDark() {
    this.noteService.data.subscribe((data) => {
      this.dark = data;
    });
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
  getUnit() {
    this.unitSubscription = this.meteoService.actualUnit.subscribe(
      (unit) => (this.farenheit = unit)
    );
  }
  getMeteo() {
    this.meteoSubscription = this.meteoService.selectedMeteo.subscribe(
      (sel) => {
        this.meteo = sel;
        if (this.meteo.list) {
          this.tomorrow = sel.list.filter(
            (date) =>
              new Date(
                (date.dt + this.offset + sel.city.timezone) * 1000
              ).getDay() !=
                new Date(
                  this.date + (this.meteo.city.timezone + this.offset) * 1000
                ).getDay() &&
              new Date(
                (date.dt + this.offset + sel.city.timezone) * 1000
              ).getHours() >= 11
          )[0];

          if (this.bg != this.tomorrow.weather[0].main) {
            this.background = this.tomorrow.weather[0].main;
            this.putDisplayed();
          }
          this.icon = icons[this.tomorrow.weather[0].icon];
        }
      }
    );
  }
  getBg() {
    this.bgSubscription=this.meteoService.nowDisplayed.subscribe((bg) => {
      this.bg = bg;
    });
  }
  putDisplayed() {
    this.meteoService.putDisplayedMeteo(this.background);
  }
  setPrevNext() {
    for (let x in routes) {
      if (routes[x].data.tab === this.tab) {
        this.next = routes[routes[x].data.tab].path;
        this.prev = routes[routes[x].data.tab - 2].path;
        let prevNext:PrevNext={
          prev:this.prev,
          next:this.next
        }
        this.noteService.putPrevNext(prevNext)
      }
    }
  }
  goLeft() {
    this.router.navigate([this.prev]);
  }
  goRight() {
    this.router.navigate([this.next]);
  }
}
