import { Directive, ElementRef, Renderer2, HostListener,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  activatedRoute;
  touchStartY:number;
  touchStartX:number;
  moveX: number;
  touchMoveY:number;
  movement:number;
  oldScroll=0;
  constructor(
     private el: ElementRef,
     private renderer: Renderer2,
     private router:Router,
     private route: ActivatedRoute
     ) {}
  ngOnInit(){
    this.route.data.subscribe((route)=>{
      this.activatedRoute=route.tab;
    })
  }
 
  @HostListener('touchmove',['$event']) onTouchMove(e) {
    this.touchMoveY=e.targetTouches[0].screenY
    this.movement=this.touchMoveY-this.touchStartY;
    this.moveX=e.targetTouches[0]-this.touchStartX
    if(Math.abs(this.movement)>70){
    this.el.nativeElement.style.opacity=1-Math.abs(this.movement)/200;
    this.el.nativeElement.style.transform='translateY('+(this.movement)+'px)'
    }
  }
  @HostListener('touchend',['$event']) onTouchEnd(e){

    
    
  }
}