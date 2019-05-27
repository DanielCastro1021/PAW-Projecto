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
   *
   */
  getActiveCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint + '/active');
  }

  /**
   *
   * @param id
   */
  getActiveCampaign(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(endpoint + '/active/' + id);
  }

  /**
   *
   */
  getDisabledCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint + '/disabled');
  }

  /**
   *
   * @param id
   */
  getDisabledCampaign(id): Observable<Campaign> {
    return this.http.get<Campaign>(endpoint + '/disabled/' + id);
  }

  /**
   *
   */
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint);
  }

  /**
   *
   * @param id
   */
  getCampaign(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(endpoint + '/' + id);
  }

  /**
   *
   * @param campaign
   */
  addCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http
      .post<any>(endpoint, JSON.stringify(campaign), httpOptions)
      .pipe(
        tap(campaign => console.log(`added Campaign w/ id=${campaign.id}`)),
        catchError(this.handleError<any>('addCampaign'))
      );
  }

  /**
   *
   * @param id
   * @param campaign
   */
  updateCampaign(id: string, campaign: Campaign): Observable<Campaign> {
    return this.http
      .put(endpoint + '/' + id, JSON.stringify(campaign), httpOptions)
      .pipe(
        tap(_ => console.log(`updated Campaign id=${id}`)),
        catchError(this.handleError<any>('updateCampaign'))
      );
  }

  /**
   *
   * @param id
   */
  deleteCampaign(id: string): Observable<Campaign> {
    return this.http.delete<any>(endpoint + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted Campaign id=${id}`)),
      catchError(this.handleError<any>('deleteCampaign'))
    );
  }

  /**
   *
   */
  getCampaignStatusSummary(): Observable<any> {
    return this.http.get<any>(endpoint + '/status');
  }

  /**
   *
   */
  getCampaignCount(): Observable<any> {
    return this.http.get<any>(endpoint + '/total');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
