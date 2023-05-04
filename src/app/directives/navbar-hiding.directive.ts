import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavbarHiding]',
})
export class NavbarHidingDirective {
  listener;
  oldScroll=0;
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('window:scroll') onWindowScroll() {
    
    let scrollY = window.scrollY;
    let newScroll = this.oldScroll - scrollY;
    let newPos=this.el.nativeElement.offsetTop+newScroll;
    if (newPos<-50){newPos=-50};
    if (newPos>0){newPos=0};
    this.el.nativeElement.style.top=newPos +"px"
    
    this.oldScroll=scrollY;
  }
}
