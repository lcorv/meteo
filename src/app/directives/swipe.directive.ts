import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { MeteoService } from '../services/meteo.service';

@Directive({
  selector: '[appSwipe]',
})
export class SwipeDirective {
  prevNext;
  drawer;
  t1: number;
  t2: number;
  direction:string="none";
  touchStartX: number;
  touchStartY: number;
  touchMoveY: number;
  touchMoveX: number;
  movement: number;
  movementX: number;
  movementY: number;
  activatedRoute;
  oldScroll = 0;
  constructor(
    private noteService: NoteService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private meteoService: MeteoService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.noteService.actualPrevNext.subscribe((prevNext) => {
      this.prevNext = prevNext;
    });
    this.meteoService.drawerstate.subscribe((drawer) => (this.drawer = drawer));
    this.route.data.subscribe((route) => {
      this.activatedRoute = route.tab;
    });
  }
  @HostListener('touchstart', ['$event']) onWindowTouch(e) {
    this.direction="none";
    this.t1 = new Date().getTime();
    this.el.nativeElement.style.transition = '';
    this.touchStartX = e.targetTouches[0].screenX;
    this.touchStartY = e.targetTouches[0].screenY;
  }
  @HostListener('touchmove', ['$event']) onTouchMove(e) {
    this.touchMoveX = e.targetTouches[0].screenX;
    this.touchMoveY = e.targetTouches[0].screenY;
    this.movementX = this.touchMoveX - this.touchStartX;
    this.movementY = this.touchMoveY - this.touchStartY;
    let scroll=this.el.nativeElement.scrollTop;
    if (scroll!=this.oldScroll){
      this.direction="ver"
      this.oldScroll=scroll
    }
    setTimeout(() => {
      if (this.direction == "none") {
        if (Math.abs(this.movementX) < Math.abs(this.movementY)&&(this.activatedRoute=="1"||this.activatedRoute=="3")) {
          this.direction = 'ver';
        } else {
          this.direction = 'hor';
        }
      }
    }, 50);
    if (this.direction == 'hor' || this.direction == 'ver') {
      //navigate today
      if (this.direction == 'hor') {
      } else {
        this.movementX = 0;
        if (this.activatedRoute == '1') {
          this.el.nativeElement.style.transition = 'all 0s';
          this.el.nativeElement.style.opacity =
            1 - Math.abs(this.movementY) / 200;
          this.el.nativeElement.style.transform =
            'translateY(' + this.movementY + 'px)';
        }
      }
      // horizontally navigate
      if (this.activatedRoute != '6') {
        if (this.direction == 'ver') {
        } else {
          this.movementY = 0;
          this.el.nativeElement.style.transition = 'all 0s';
          this.el.nativeElement.style.opacity =
            1 - Math.abs(this.movementX) / 200;
          this.el.nativeElement.style.transform =
            'translateX(' + this.movementX + 'px)';
        }
      }
    }
  }
  @HostListener('touchend', ['$event']) onTouchEnd(e) {
    this.direction = "none";
    this.el.nativeElement.style.transition = 'all 0.2s';
    this.t2 = new Date().getTime();
    let t3 = this.t2 - this.t1;
    //console.log(t3+"ms")
    if (Math.abs(this.movementX) > Math.abs(this.movementY)) {
      this.movementY = 0;
      this.movement = Math.abs(this.movementX);
    } else {
      this.movementX = 0;
      this.movement = Math.abs(this.movementY);
    }
    //console.log(this.movement+"px")
    if (this.movement <= 70 && t3 > 200) {
      this.el.nativeElement.style.opacity = 1;
      this.el.nativeElement.style.transform = 'translate(0)';
    }

    if (this.movement <= 20 && t3 < 200) {
      this.el.nativeElement.style.opacity = 1;
      this.el.nativeElement.style.transform = 'translate(0)';
    }
    if (
      this.activatedRoute != '6' &&
      (t3 < 200 || (t3 > 200 && this.movement > 70))
    ) {
      if (this.movementX > 20) {
        if (this.prevNext.next != 'tomorrow') {
          this.router.navigate([this.prevNext.prev]);
        } else {
          this.drawer.open();
          this.el.nativeElement.style.opacity = 1;
          this.el.nativeElement.style.transform = 'translate(0)';
        }
      }
      if (this.movementX < -20) {
        this.router.navigate([this.prevNext.next]);
        if (
          this.prevNext.next == 'moredays' &&
          this.prevNext.prev == 'tomorrow'
        ) {
          this.el.nativeElement.style.opacity = 1;
          this.el.nativeElement.style.transform = 'translate(0)';
        }
      }
    }
    if (this.activatedRoute == '1' || this.activatedRoute == '6') {
      if (this.movementY < -20) {
        this.router.navigate(['home', 'daydetails']);
      }
      if (this.activatedRoute == '6' && this.movementY > 20) {
        this.router.navigate(['home']);
      }
      if (this.activatedRoute == '1' && this.movementY > 20) {
        this.el.nativeElement.style.opacity = 1;
        this.el.nativeElement.style.transform = 'translate(0)';
      }
      if (this.activatedRoute == '6' && this.movementY < -20) {
        this.el.nativeElement.style.opacity = 1;
        this.el.nativeElement.style.transform = 'translate(0)';
      }
    }
    this.touchStartX = 0;
    this.movementX = 0;
    this.movementY = 0;
  }
}
