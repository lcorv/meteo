import { Pipe, PipeTransform } from '@angular/core';
import { REGIONS } from '../shared/regions';
@Pipe({
  name: 'region'
})
export class RegionPipe implements PipeTransform {

  transform(value: any): any {
  let country= REGIONS.filter((region)=>region.alpha===value)[0];
  return country.name
  }

}