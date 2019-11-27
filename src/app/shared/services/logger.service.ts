import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogEntry } from './log.class';
import { JSON_SERVER_URLS } from '../config';

@Injectable() 
export class LoggerService {
    public appLogs = [ ];
    constructor(private http: HttpClient) { }
    log(entry: LogEntry): void {
        let appLogs = {
            logInformation : []
        };
        this.http.get(environment.JSONSERVER + JSON_SERVER_URLS.LOGGER_URL)
        .subscribe((res: any) => {
          appLogs = res;
          appLogs.logInformation.push(entry);
            this.http.post(environment.JSONSERVER + JSON_SERVER_URLS.LOGGER_URL, appLogs)
            .subscribe((post: any) => {
            },
              (e) => console.log(e, 'while adding data'));
        },
          (e) => console.log(e, 'while fetching data'));
    }
}

/* 
this.homeService.addLogs({
  id: Math.random(),
  component: 'App',
  log: 'Inside App.component.ts ngOnInit'
}) */