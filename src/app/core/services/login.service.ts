import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JSON_SERVER_URLS } from '../../shared/config';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getUserData(): Observable<any> {
    return this.httpClient.get(environment.JSONSERVER + JSON_SERVER_URLS.USER_DETAILS);
  }


}
