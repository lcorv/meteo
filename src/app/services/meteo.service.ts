import { Injectable, ElementRef } from '@angular/core';
import { Meteo } from '../shared/meteo';
import { Error } from '../shared/error';
import { Chart } from '../shared/chart';
import { Forecast } from '../shared/forecast';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material/sidenav';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable()
export class MeteoService {
  private apiKey = '';
  private drawer: BehaviorSubject<MatDrawer> = new BehaviorSubject<MatDrawer|any>('');
  drawerstate: Observable<MatDrawer>=this.drawer.asObservable();
  private city: BehaviorSubject<string> = new BehaviorSubject<string>('');
  actualcity: Observable<string> = this.city.asObservable();
  private farenheit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  actualUnit: Observable<boolean> = this.farenheit.asObservable();
  private meteo: BehaviorSubject<Meteo | any> = new BehaviorSubject<
    Meteo | any
  >([]);
  private displayedMeteo: BehaviorSubject<string> = new BehaviorSubject<string>('')
  selectedMeteo: Observable<Meteo> = this.meteo.asObservable();
  nowDisplayed: Observable<string> = this.displayedMeteo.asObservable();
  private error: BehaviorSubject<Error | any> = new BehaviorSubject<
    Error | any
  >([]);
  actualError: Observable<Error> = this.error.asObservable();
  private date: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  actualdate: Observable<Date> = this.date.asObservable();
  private chart: BehaviorSubject<Chart[]|any>=new BehaviorSubject<Chart[]|any>('');
  actualChart: Observable<Chart[]>= this.chart.asObservable();

  constructor(
    private http: HttpClient,
    private processHttpMsgService:ProcessHttpMsgService,
    ) {}
  putCity(city: string) {
    this.city.next(city);
  }
  putDisplayedMeteo(displayed:string){
    this.displayedMeteo.next(displayed)
  }
  putDrawer(drawer){
     this.drawer.next(drawer);
  }
  putDate(date: Date) {
    this.date.next(date);
  }
  putUnit(unit: boolean) {
    this.farenheit.next(unit);
  }
  putMeteo(meteo: Meteo, error:Error) {
    this.meteo.next(meteo);
    this.error.next(error);
  }
  putChart(chart:Chart[]){
    this.chart.next(chart);
    //console.log(JSON.stringify(chart))
  }
  getMeteo(city: string) {
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
      city +
      '&appid=' +
      this.apiKey +
      '&units=metric&lang=EN';
    return this.http.get(url).pipe(catchError(this.processHttpMsgService.handleError))
  }
  getSelectedMeteo() {
    return this.selectedMeteo;
  }
  getCity(): Observable<any> {
    return this.actualcity;
  }
  getInitialCity(lat,lon){
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+this.apiKey+"&units=metric&lang=IT"
    return this.http.get(url).pipe(catchError(this.processHttpMsgService.handleError))
  }
}
