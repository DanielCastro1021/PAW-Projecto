import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Campaign } from '../../models/Campaign';
import { Donation } from '../../models/Donation';

const endpointDonations = 'http://localhost:3000/api/v1/donations/';
const endpointCampaign = 'http://localhost:3000/api/v1/campaigns/';

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

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpointDonations + 'Donations');
    //.pipe(map(this.extractData));
  }

  getDonation(id): Observable<Donation> {
    return this.http.get<Donation>(endpointDonations + 'Donation/' + id);
    //.pipe(map(this.extractData));
  }

  addDonation(Donation): Observable<Donation> {
    console.log(Donation);
    return this.http
      .post<any>(
        endpointDonations + 'Donations',
        JSON.stringify(Donation),
        httpOptions
      )
      .pipe(
        tap(Donation => console.log(`added Donation w/ id=${Donation.id}`)),
        catchError(this.handleError<any>('addDonation'))
      );
  }

  updateDonation(id, Donation): Observable<Donation> {
    return this.http
      .put(
        endpointDonations + 'Donation/' + id,
        JSON.stringify(Donation),
        httpOptions
      )
      .pipe(
        tap(_ => console.log(`updated Donation id=${id}`)),
        catchError(this.handleError<any>('updateDonation'))
      );
  }

  deleteDonation(id): Observable<Donation> {
    return this.http
      .delete<any>(endpointDonations + 'Donation/' + id, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted Donation id=${id}`)),
        catchError(this.handleError<any>('deleteDonation'))
      );
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpointCampaign + 'Campaigns');
    //.pipe(map(this.extractData));
  }

  getCampaign(id): Observable<Campaign> {
    return this.http.get<Campaign>(endpointCampaign + 'Campaign/' + id);
    //.pipe(map(this.extractData));
  }

  addCampaign(Campaign): Observable<Campaign> {
    console.log(Campaign);
    return this.http
      .post<any>(
        endpointCampaign + 'Campaigns',
        JSON.stringify(Campaign),
        httpOptions
      )
      .pipe(
        tap(Campaign => console.log(`added Campaign w/ id=${Campaign.id}`)),
        catchError(this.handleError<any>('addCampaign'))
      );
  }

  updateCampaign(id, Campaign): Observable<Campaign> {
    return this.http
      .put(
        endpointCampaign + 'Campaign/' + id,
        JSON.stringify(Campaign),
        httpOptions
      )
      .pipe(
        tap(_ => console.log(`updated Campaign id=${id}`)),
        catchError(this.handleError<any>('updateCampaign'))
      );
  }

  deleteCampaign(id): Observable<Campaign> {
    return this.http
      .delete<any>(endpointCampaign + 'Campaign/' + id, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted Campaign id=${id}`)),
        catchError(this.handleError<any>('deleteCampaign'))
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
