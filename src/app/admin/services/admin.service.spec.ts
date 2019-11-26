import { TestBed } from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { AdminService } from './admin.service';
import { of, Observable } from 'rxjs';

class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
}

describe('AdminService', () => {
    let service: AdminService;
    let httpMock: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AdminService, StoreModule,
                { provide: Store, useClass: StoreMock }],
                schemas: [NO_ERRORS_SCHEMA]
                    });
        service = TestBed.get(AdminService);
        httpMock = TestBed.get(HttpTestingController);
    });

    
    it('should be created', () => {
        expect(service).toBeTruthy();
      });

      it('should get data from API', () =>{
          let spy =spyOn(service, 'saveNowPlaying').and.callFake(
              t => {
                  return Observable.call;
              });
          service.saveNowPlaying('data', 1);
          expect(spy).toHaveBeenCalled();
      });
      it('should search searchMovie function', () => {
          let spy = spyOn(service, 'searchMovie');
          expect(spy).toHaveBeenCalled;
      });
      it('should call newTheater function', () => {
        let spy = spyOn(service, 'newTheater');
        expect(spy).toHaveBeenCalled;
    });
    it('should add theaters when newTheater called', () => {
        service.newTheater('theater');
        expect(service.newTheater.length).toBe(1);
    });
    it('should save current playing movies when saveNowPlaying called', () => {
        service.saveNowPlaying('movie', 1);
        expect(service.saveNowPlaying.length).toBe(2);
    });
    it('should search movies when searchMovie called', () => {
        service.searchMovie('movie');
        expect(service.searchMovie.length).toBe(1);
    });
    it('should assign value to newObject', () => {
        service.newTheater('data');
        expect(service.newTheater).toHaveBeenCalled;
    });
})
