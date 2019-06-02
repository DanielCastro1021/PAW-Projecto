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
   * This function makes a http get request to REST API, to get all  donations.
   */
  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint);
  }

  /**
   * This function makes a http get request to REST API, to get a donation.
   * @param id This is an Object.Id that corresponds to a donation, in REST API.
   */
  getDonation(id: string): Observable<Donation> {
    return this.http.get<Donation>(endpoint + '/' + id);
  }

  /**
   * This function makes a http get request to REST API, to get all processed donations.
   */

  getProcessedDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/processed');
  }

  /**
   * This function makes a http get request to REST API, to get all not processed donations.
   */
  getInProcessingDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/in-processing');
  }
  /**
   * This function makes a http get request to REST API, to get all canceled donations.
   */
  getCanceledDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/canceled');
  }

  /**
   * This function makes a http post request to REST API, to add a donation.
   * @param donation This is a donation.
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
   * This function makes a http put request to REST API, to update a donation.
   * @param id This is an Object.Id that corresponds to a donation, in REST API.
   * @param donation This is a donation.
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
   * This function makes a http delete request to REST API, to delete a donation.
   * @param id This is an Object.Id that corresponds to a donation, in REST API.
   */
  deleteDonation(id: string): Observable<Donation> {
    return this.http.delete<Donation>(endpoint + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted Donation id=${id}`)),
      catchError(this.handleError<any>('deleteDonation'))
    );
  }

  /**
   * This function makes a http get request to REST API, to get all donations made, to a campaign.
   * @param id This is an Object.Id that corresponds to a campaign, in REST API.
   */
  getCampaignDonations(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/campaign/' + id);
  }

  /**
   * This function makes a http get request to REST API, to get all donations made, by an user.
   * @param id This is an Object.Id that corresponds to a user, in REST API.
   */
  getUserDonations(username: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + '/user/' + username);
  }
  /**
   * This function makes a http get request to REST API, to return the total number of donations made.
   */
  getDonationsCount(): Observable<any> {
    return this.http.get<any>(endpoint + '/count');
  }

  /**
   * This function makes a http get request to REST API, to return the count of each value, in the variable status of Donation.
   */
  getDonationsStatusSummary(): Observable<any> {
    return this.http.get<any>(endpoint + '/status');
  }

  /**
   * This function makes a http get request to REST API, to return the sum of all processed donations.
   */
  getDonationsTotalAmount(): Observable<any> {
    return this.http.get<any>(endpoint + '/total-donated');
  }

  /**
   * This function makes a http get request to REST API, to return the total amount spent in donations, per user.
   */
  getTotalSpentPerUser(): Observable<any> {
    return this.http.get<any>(endpoint + '/users/total-spent');
  }

  /**
   *  This function makes a http get request to REST API, to return the number of donations made by each user.
   */
  getCountDonationsPerUser(): Observable<any> {
    return this.http.get<any>(endpoint + '/users/count-donations');
  }

  /**
   * This function handles errors;
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
