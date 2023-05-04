import { Directive, ElementRef, Renderer2, HostListener,Input } from '@angular/core';

@Directive({
  selector: '[appHighlights]'
})
export class HighlightsDirective {
@Input()appHighlights:string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }
@HostListener('mouseover') onMouseEnter(){
  this.renderer.addClass(this.el.nativeElement ,("highlight-"+this.appHighlights));
  }

@HostListener('mouseleave') onMouseLeave(){
  this.renderer.removeClass(this.el.nativeElement , ("highlight-"+this.appHighlights));
}
  highlight(color: string) {
    this.el.nativeElement.style.color = color;
    }
}
