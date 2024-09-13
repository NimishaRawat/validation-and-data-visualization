import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<{ datetime: Date, temperature: number }[]>([]);
  data$ = this.dataSubject.asObservable();

  addData(data: { datetime: Date, temperature: number }) {
    const currentData = this.dataSubject.value;
    this.dataSubject.next([...currentData, data]);
  }
}
