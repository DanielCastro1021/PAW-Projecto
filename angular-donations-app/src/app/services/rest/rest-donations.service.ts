import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Donation } from '../../models/Donation';

const endpoint = 'http://localhost:3000/api/v1/donations';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestDonationsService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param id
   */
  getDonations(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/campaign/' + id);
  }

  /**
   *
   * @param id
   */
  getDonation(id: string): Observable<Donation> {
    return this.http.get<Donation>(endpoint + '/' + id);
  }

  /**
   *
   * @param donation
   */
  addDonation(donation: Donation): Observable<Donation> {
    console.log(Donation);
    return this.http
      .post<Donation>(endpoint, JSON.stringify(donation), httpOptions)
      .pipe(
        tap(donation => console.log(`added Donation w/ id=${donation._id}`)),
        catchError(this.handleError<any>('addDonation'))
      );
  }

  /**
   *
   * @param id
   * @param donation
   */
  updateDonation(id: string, donation: Donation): Observable<Donation> {
    return this.http
      .put(endpoint + '/' + id, JSON.stringify(donation), httpOptions)
      .pipe(
        tap(_ => console.log(`updated Donation id=${id}`)),
        catchError(this.handleError<any>('updateDonation'))
      );
  }

  /**
   *
   * @param id
   */
  deleteDonation(id: string): Observable<Donation> {
    return this.http.delete<Donation>(endpoint + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted Donation id=${id}`)),
      catchError(this.handleError<any>('deleteDonation'))
    );
  }

  /**
   *
   * @param id
   */
  getCampaignDonations(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/campaign/' + id);
  }

  /**
   *
   * @param operation
   * @param result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
