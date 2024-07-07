import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse, UserInterface } from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  public postUser(newUser: Partial<UserInterface>): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(
      environment.baseURL + '/user',
      newUser,
    );
  }

  public postLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginRequest>(
        environment.baseURL + '/user/login',
        loginRequest,
      )
      .pipe(
        tap((response: any) => {
          this.authService.setToken(response.token)
        }),
      );
  }

  public getUser(): Observable<any> {
    return this.httpClient.get(
      environment.baseURL + '/user', {
        headers: {
          Authorization: this.authService.getToken()!,
        }}
    );
  }

  public updateUser(body: Partial<UserInterface>): Observable<any> {
    return this.httpClient.put(environment.baseURL + '/user', body, {
      headers: {
        Authorization: this.authService.getToken()!,
      },
    });
  }
}
