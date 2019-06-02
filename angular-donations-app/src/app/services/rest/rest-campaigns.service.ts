import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Campaign } from '../../models/Campaign';

const endpoint = 'http://localhost:3000/api/v1/campaigns';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestCampaignsService {
  constructor(private http: HttpClient) {}

  /**
   * This function makes a http post request to REST API, to save a logo.
   * @param logo This is a image.
   */
  uploadLogo(logo) {
    return this.http
      .post('http://localhost:3000/api/v1/logos/upload', logo)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      });
  }

  /**
   * This function makes a http get request to REST API, to get all active campaign.
   */
  getActiveCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint + '/active');
  }

  /**
   * This function makes a http get request to REST API, to get an active campaign.
   * @param id This is an Object.Id that corresponds to a campaign, in REST API.
   */
  getActiveCampaign(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(endpoint + '/active/' + id);
  }

  /**
   * This function makes a http get request to REST API, to get all disabled campaign.
   */
  getDisabledCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint + '/disabled');
  }

  /**
   * This function makes a http get request to REST API, to get all campaign.
   */
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint);
  }

  /**
   * This function makes a http get request to REST API, to get a campaign.
   * @param id This is an Object.Id that corresponds to a campaign, in REST API.
   */
  getCampaign(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(endpoint + '/' + id);
  }

  /**
   * This function makes a http post request to REST API, to add a campaign.
   * @param Campaign This is the a campaign.
   */
  addCampaign(campaign): Observable<Campaign> {
    return this.http
      .post<any>(endpoint, JSON.stringify(campaign), httpOptions)
      .pipe(
        tap(Campaign => console.log(`added Campaign w/ id=${Campaign.id}`)),
        catchError(this.handleError<any>('addCampaign'))
      );
  }

  /**
   * This function makes a http put request to REST API, to update a campaign.
   * @param id This is an Object.Id that corresponds to a campaign, in REST API.
   * @param campaign This is the a campaign.
   */
  updateCampaign(id: string, campaign): Observable<Campaign> {
    return this.http
      .put(endpoint + '/' + id, JSON.stringify(campaign), httpOptions)
      .pipe(
        tap(_ => console.log(`updated Campaign id=${id}`)),
        catchError(this.handleError<any>('updateCampaign'))
      );
  }

  /**
   * This function makes a http delete request to REST API, to delete a campaign.
   * @param id This is an Object.Id that corresponds to a campaign, in REST API.
   */
  deleteCampaign(id: string): Observable<Campaign> {
    return this.http.delete<any>(endpoint + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted Campaign id=${id}`)),
      catchError(this.handleError<any>('deleteCampaign'))
    );
  }

  /**
   * This function makes a http get request, to obtain the  count of the campaign, by status, in the REST API.
   */
  getCampaignStatusSummary(): Observable<any> {
    return this.http.get<any>(endpoint + '/status');
  }

  /**
   * This function makes a http get request, to obtain the total count of the campaign, in the REST API.
   */
  getCampaignCount(): Observable<any> {
    return this.http.get<any>(endpoint + '/total');
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
