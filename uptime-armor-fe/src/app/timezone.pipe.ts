import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'timezone'
})
export class TimezonePipe implements PipeTransform {
  transform(value: Date, zone: string): any {
    if (value) {
      return moment(value).tz(zone).format('MM-DD-YYYY HH:mm:ss');
    }
    return null;
  }
}