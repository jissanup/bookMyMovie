import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  constructor(private httpClient: HttpClient) {}

  getUserData(): Observable<any> {
    return this.httpClient.get('http://localhost:3002/userDetails/');
  }
}
