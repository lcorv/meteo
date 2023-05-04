import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../shared/error'

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMsgService {

  constructor() { }
public handleError(error: HttpErrorResponse ){
  let errMsg:Error;
  if(error.error instanceof ErrorEvent){
    errMsg = {message:error.error.message};
  }
  
  else{
    errMsg={status:error.status, text:error.statusText, message:error.error.message}
  }
  return throwError(()=> (errMsg));
}
}