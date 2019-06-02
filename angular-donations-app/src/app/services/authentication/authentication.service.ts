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

  /**
   * This function makes a http post request to REST API, to login a user.
   * @param username This is a string, with the username of a User.
   * @param password This is a string, with the password of a User.
   */
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

  /**
   * This function makes a http get request to REST API, to logout a user and removes credentials from localStorage.
   */
  logout() {
    localStorage.removeItem('currentUser');
    return this.http.get<any>(endpoint + 'logout');
  }

  /**
   * This function makes a http post request to REST API, to register a user.
   * @param userData This is a User.
   */
  register(userData) {
    return this.http.post<any>(endpoint + 'register', { userData }).pipe(
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

  /**
   * This function makes a http get request to REST API, for a authenticated user.
   */
  getMe() {
    return this.http.get<User>(endpoint + 'profile');
  }

  /**
   * This function makes a http pu request to REST API, to update an user.
   *
   * @param id This is an Object.Id that corresponds to a user, in REST API.
   * @param userData This is a User.
   */
  updateMe(id: string, userData: User) {
    return this.http
      .put(endpoint + id, JSON.stringify(userData), httpOptions)
      .pipe(
        tap(_ => console.log(`updated User id=${id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  /**
   * This function makes a http delete request to REST API, to delete an user.
   * @param id This is an Object.Id that corresponds to a user, in REST API.
   */
  deleteMe(id) {
    return this.http.delete<any>(endpoint + id).pipe(
      tap(_ => console.log(`deleted User id=${id}`)),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  /**
   * This function makes a http get request to REST API, with an username , for the an user.
   * @param username This is the username of a User.
   */
  getUserByUsername(username) {
    return this.http.get<User>(endpoint + 'user/' + username);
  }

  /**
   * This function makes a http get request to REST API, for the user count, by role.
   */
  getUserRoles() {
    return this.http.get<User>(endpoint + 'roles');
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
