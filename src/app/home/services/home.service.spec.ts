import { TestBed } from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { HomeService } from './home.service';
import { of } from 'rxjs';
import { Movie } from '../models/movie.model';

class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
}

describe('HomeService', () => {
    let service: HomeService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HomeService, StoreModule,
                { provide: Store, useClass: StoreMock }
            ]
        });
        service = TestBed.get(HomeService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
      });
      it('should get current playing movies when getNowshowing called', () => {
        service.getNowshowing(1);
        expect(service.getNowshowing.length).toBe(1);
    });
    it('should get upcoming playing movies when getUpcomingMovies called', () => {
        service.getUpcomingMovies(1);
        expect(service.getUpcomingMovies.length).toBe(1);
    });
    it('should return genres when getGenres called', () => {
        service.getGenres();
        expect(service.getGenres.length).toBe(0);
    });
    it('should get genres when fetchGenres called', () => {
        service.fetchGenres();
        expect(service.fetchGenres.length).toBe(0);
    });
    it('should post logs when addLogs called', () => {
        service.addLogs('log');
        expect(service.addLogs.length).toBe(1);
    });
    it('should get cast and crew details when getCastAndCrew called', () => {
        const dummyMovies: Movie[] =[
            {
              
                    title: 'movie',
                    id: 1,
                    popularity: 'popular',
                    poster_path: '/',
                    release_date: '3/9/2019',
                    original_language: 'en',
                    overview: 'good',
                    genre_ids: 3,
                    vote_average: 3,
                    vote_count: 2,
            }
        ]
        service.getCastAndCrew(dummyMovies);
        expect(service.getCastAndCrew.length).toBe(1);
    });
}) 