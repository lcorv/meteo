import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject  } from 'rxjs'; 
import { PrevNext } from '../shared/prevnext';

@Injectable()
export class NoteService {
  private prevNext:BehaviorSubject<PrevNext|any>= new BehaviorSubject<PrevNext|any>({prev:'',next:''})
  actualPrevNext:Observable<PrevNext>= this.prevNext.asObservable();
  private dark:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dark.asObservable();
  constructor() {}
  
  putDark(dark:boolean ){
     this.dark.next(dark);
  }  
  putPrevNext(prevNext:PrevNext){
    this.prevNext.next(prevNext);
  }
}
