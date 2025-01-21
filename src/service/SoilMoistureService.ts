import { Injectable } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SoilMoistureService {
  constructor(private database: Database) {}

  fetchSoilMoistureData(): Observable<any> {
    return new Observable((observer) => {
      const dbRef = ref(this.database, 'SoilMoistureData');
      onValue(dbRef, (snapshot) => {
        observer.next(snapshot.val());
      });
    });
  }
}