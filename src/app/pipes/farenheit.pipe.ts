import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'farenheit'
})
export class FarenheitPipe implements PipeTransform {

  transform(value: any  ): string {
    return (Math.round(parseInt(value)*9/5)+32).toString();
  }

}