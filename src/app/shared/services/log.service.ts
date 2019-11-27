import { Injectable } from '@angular/core';
import { LogEntry, LogLevel } from './log.class';
import { LoggerService } from './logger.service';

@Injectable()
export class LogService {
    public level: LogLevel = LogLevel.All;
    public logWithDate = true;
    public logger: LoggerService[];

    constructor(private loggerService: LoggerService) {}

    public debug(msg: string, ...optionalParams: any[]): void {
        this.writeToLog(msg, LogLevel.Debug, optionalParams);
    }

    public info(msg: string, ...optionalParams: any[]): void {
        this.writeToLog(msg, LogLevel.Info, optionalParams);
    }

    public warn(msg: string, ...optionalParams: any[]): void {
        this.writeToLog(msg, LogLevel.Warn, optionalParams);
    }

    public error(msg: string, ...optionalParams: any[]): void {
        this.writeToLog(msg, LogLevel.Error, optionalParams);
    }

    public fatal(msg: string, ...optionalParams: any[]): void {
        this.writeToLog(msg, LogLevel.Fatal, optionalParams);
    }

    private writeToLog(msg: string, level: LogLevel, params: any[]) {
        if (this.shouldLog(level)) {
            const entry: LogEntry = new LogEntry();
            entry.message = msg;
            entry.level = level;
            entry.extraInfo = params;
            entry.logWithDate = this.logWithDate;
           this.loggerService.log(entry);
        }
    }

    private shouldLog(level: LogLevel): boolean {
        let ret = false;
        if ((level >= this.level &&
             level !== LogLevel.Off) ||
             this.level === LogLevel.All) {
          ret = true;
        }
        return ret;
      }

}
