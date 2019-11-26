import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HomeService } from 'src/app/home/services/home.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `ClientError: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;

            if (error.status === 401) {
                // refresh token
            }
            else if (error.status === 404) {
                errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
            }
            else if (error.status === 0 && error.statusText == 'Unknown Error' && error.url == null) {
              //  alert('Run the JsonServer');
                errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
            } else if (error.status === 429) {
                errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
            }
            else if (!navigator.onLine) {
                errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
            }
        }
        return throwError(localStorage.setItem('Error', errorMessage));
    }

    constructor(public homeService: HomeService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }


}
