import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../services/meteo.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  city: string;
  info;
  constructor(private meteoService: MeteoService) {}

  ngOnInit() {
    this.meteoService.selectedMeteo.subscribe((sel)=>
    this.info = sel.city
    )
    this.meteoService.actualcity
    .subscribe((city)=>this.city=city)
  }
}
