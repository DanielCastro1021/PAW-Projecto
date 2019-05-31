import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../../models/User';

const endpoint = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(endpoint + 'login', { username, password }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    return this.http.get<any>(endpoint + 'logout');
  }

  register(user: User) {
    return this.http.post<any>(endpoint + 'register', { user }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  getMe() {
    return this.http.get<User>(endpoint + 'profile');
  }

  updateMe(id, userData: User) {
    return this.http
      .put(endpoint + id, JSON.stringify(userData), httpOptions)
      .pipe(
        tap(_ => console.log(`updated User id=${id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  deleteMe(id) {
    return this.http.delete<any>(endpoint + 'profile/' + id).pipe(
      tap(_ => console.log(`deleted User id=${id}`)),
      catchError(this.handleError<any>('deleteUser'))
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
