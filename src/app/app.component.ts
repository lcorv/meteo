import { Component , OnInit , ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NoteService } from './services/note.service';
import { darkBtn,navbar,routeAnim,bgInOut } from './animation/animations';
import { MeteoService } from './services/meteo.service';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  host: {
    'style': 'display:block'
  },
  animations: [
    darkBtn(),
    navbar(),
    routeAnim(),
    bgInOut(),
  ]
})
export class AppComponent implements OnInit {
  city:string;
  meteo:any;
  splash:boolean=true;
  date= new Date().getTime();
  sunset:number;
  sunrise:number;
  dark:boolean;
  background:string="";
  displayed:string;
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;
  @ViewChild('bg',{static:false}) private bg;

  constructor(
    private noteService:NoteService,
    private meteoService:MeteoService,
    private router:Router,
    private renderer: Renderer2,
    private el:ElementRef
    
    ) 
  {}
  ngOnInit(){
    setTimeout(()=>{this.splash=false},4000)
 
  }

  ngAfterViewInit(){
    this.meteoService.putDrawer(this.drawer)
    this.meteoService.selectedMeteo.subscribe((city)=>{
      if(city.city){
        this.city=city.city.name;
        this.sunrise=city.city.sunrise;
        this.sunset=city.city.sunset;
        if(this.city && this.bg){
          if(Math.abs(this.sunset-this.date/1000)<3600||Math.abs(this.sunrise-this.date/1000)<3600){
            this.bg.nativeElement.parentElement.style.backgroundImage='linear-gradient(to top ,#f559 0%, #fb69 20%, #fff0)'
          }
          else{
            this.bg.nativeElement.parentElement.style.backgroundImage='linear-gradient(to top ,#f550 0%, #fb60 20%, #fff0)'
          }
        }
      }
    })
    this.meteoService.nowDisplayed.subscribe((meteoBg)=>{
      this.displayed = meteoBg;
      if( meteoBg=="Clouds" || meteoBg=="Rain"){
        this.background="url(https://www.pngplay.com/wp-content/uploads/13/Cumulus-Clouds-Background-PNG-Image.png)";
      }else{
        this.background=""
      };
      setTimeout(()=>{
        let bg: HTMLDivElement = this.el.nativeElement.querySelector('.meteo-bg');
        if(this.bg){
          this.setBackground(meteoBg);
          bg.style.backgroundImage = this.background;
        }
      },500)
      
    })
  }
  prepareRoute(outlet: RouterOutlet){
    if (outlet.isActivated) {return outlet.activatedRouteData["tab"]}
    else return 1;
  }
  putDark(dark){
    this.noteService.putDark(dark);
  }
  setBackground(bg){
   
    if(bg=="Rain"){
      this.bg.nativeElement.innerHTML=""
      this.generateRain(20);
    }
    else{
      this.bg.nativeElement.innerHTML=""
      this.bg.nativeElement.style.backgroundColor=""

    }
  }
  generateRain(number){
    this.bg.nativeElement.style.backgroundColor="#668"
    for(let i=0;i<number;i++){
      let height=28-Math.random()*18;
      let left=100-Math.random()*200;
      let delay=Math.random()*10;
      let drop=this.renderer.createElement('div');
      drop.className="drop";
      drop.style.height=height+"px";
      drop.style.animationDelay=delay+"s";
      drop.style.left=left+"%";
      this.bg.nativeElement.appendChild(drop)
  }
  }
}
