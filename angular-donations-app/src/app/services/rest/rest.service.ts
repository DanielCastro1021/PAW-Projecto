import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Campaign } from '../../models/Campaign';
import { Donation } from '../../models/Donation';

const endpointDonations = 'http://localhost:3000/api/v1/donations';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  getDonations(id): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpointDonations + '/campaign/' + id);
  }

  getDonation(id): Observable<Donation> {
    return this.http.get<Donation>(endpointDonations + '/' + id);
  }

  addDonation(Donation): Observable<Donation> {
    console.log(Donation);
    return this.http
      .post<any>(endpointDonations, JSON.stringify(Donation), httpOptions)
      .pipe(
        tap(Donation => console.log(`added Donation w/ id=${Donation.id}`)),
        catchError(this.handleError<any>('addDonation'))
      );
  }

  updateDonation(id, Donation): Observable<Donation> {
    return this.http
      .put(endpointDonations + '/' + id, JSON.stringify(Donation), httpOptions)
      .pipe(
        tap(_ => console.log(`updated Donation id=${id}`)),
        catchError(this.handleError<any>('updateDonation'))
      );
  }

  deleteDonation(id): Observable<Donation> {
    return this.http
      .delete<any>(endpointDonations + '/' + id, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted Donation id=${id}`)),
        catchError(this.handleError<any>('deleteDonation'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
