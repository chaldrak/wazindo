import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: any, length: number): any {
      if (value === null || value === undefined) return "";
  let limitTo = value.substr(0,length);
  if(value.length >= length){
     limitTo = value.substr(0,length) +'...';
  }
    return limitTo;
  }

}
