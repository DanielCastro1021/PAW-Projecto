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
  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint);
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
   */
  getProcessedDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/processed');
  }

  /**
   *
   */
  getInProcessingDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/in-processing');
  }
  /**
   *
   */
  getCanceledDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/canceled');
  }

  /**
   *
   * @param donation
   */
  addDonation(Donation): Observable<Donation> {
    console.log(Donation);
    return this.http
      .post<Donation>(endpoint, JSON.stringify(Donation), httpOptions)
      .pipe(
        tap(Donation => console.log(`added Donation w/ id=${Donation._id}`)),
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
   * @param id
   */
  getUserDonations(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/user/' + id);
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
