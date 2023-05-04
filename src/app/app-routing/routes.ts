import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TomorrowComponent } from '../tomorrow/tomorrow.component';
import { MoreDaysComponent } from '../more-days/more-days.component';
import { DayDetailsComponent } from '../day-details/day-details.component';


export const routes: Routes = [
  {
    path: 'home', component: HomeComponent, data: {
      tab: 1
    }
  },
  {
    path: 'tomorrow', component: TomorrowComponent, data: {
      tab: 2
    }
  },
  {
    path: 'moredays', component: MoreDaysComponent, data: {
      tab: 3
    }
  },
  {
    path: 'home/daydetails', component: DayDetailsComponent, data: {
      tab: 6
    }
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full', data: {
      tab: ''
    }
  }
]