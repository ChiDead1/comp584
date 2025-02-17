import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public tokenKey: string = "token";
  
  private _authStatus = new Subject<boolean>();
  public authStatus = this._authStatus.asObservable();
  constructor(
    protected http: HttpClient) {
  }
  isAuthenticated() : boolean {
    return this.getToken() !== null;
  }
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  init() : void {
    if (this.isAuthenticated())
      this.setAuthStatus(true);
  }
  login(item: LoginRequest): Observable<LoginResult> {
    const baseUrl ="https://localhost:7276/api/Account/Login";
    return this.http.post<LoginResult>(baseUrl, item)
      .pipe(tap(loginResult => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true);
        }
      }));
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }
  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }
}