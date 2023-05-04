import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HammerModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { TomorrowComponent } from './tomorrow/tomorrow.component';
import { MoreDaysComponent } from './more-days/more-days.component';
import { DayDetailsComponent } from './day-details/day-details.component'

import { NoteService } from './services/note.service';
import { MeteoService } from './services/meteo.service';
import { HttpClientModule } from '@angular/common/http';
import { ProcessHttpMsgService } from './services/process-http-msg.service';

import { SwipeDirective } from './directives/swipe.directive';
import { ScrollDirective} from './directives/scroll.directive';
import { HighlightsDirective } from './directives/highlights.directive';
import { NavbarHidingDirective } from './directives/navbar-hiding.directive';
import { FarenheitPipe } from './pipes/farenheit.pipe';
import { RegionPipe } from './pipes/region.pipe';

@NgModule({
  imports:      [ 
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HammerModule,
  
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxChartsModule
    
   ],
  declarations: [ 
    AppComponent, 
    DayDetailsComponent,
    HomeComponent,
    NavbarComponent,
    NavigationComponent,
    FooterComponent,
    TomorrowComponent,
    MoreDaysComponent,
    SwipeDirective,
    HighlightsDirective,
    NavbarHidingDirective,
    ScrollDirective,
    FarenheitPipe,
    RegionPipe
  
  ],
  providers:[
    NoteService,
    MeteoService,
    ProcessHttpMsgService,
    
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
