import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
import { Store } from '@ngrx/store';
 
import { HomeComponent } from './home.component';
import { HomeService } from '../../services/home.service';
import { of } from 'rxjs';
 
class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
}
 
class MockHomeService {
    getNowshowing(page) { }
    getUpcomingMovies(page) { }
    getGenres() { }
}
 
describe('HomeComponent', () => {
    let fixture;
    let component: HomeComponent;
 
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            providers: [
                { provide: Store, useClass: StoreMock },
                { provide: HomeService, useClass: MockHomeService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
    });
 
    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });
 
    it('should run ngOnInit()', async () => {
        const result = component.ngOnInit();
        expect(component.ngOnInit()).toBe(undefined);
    });
 
    it('should run getNewSetofNowPlayingMovies()', async () => {
        let page = "3"
        const result = component.getNewSetofNowPlayingMovies(page);
        expect(component.getNewSetofNowPlayingMovies(3)).toBe(undefined);
    });
 
    it('should run getNewSetofComingMovies()', async () => {
        let page = "3"
        const result = component.getNewSetofComingMovies(page);
        expect(component.getNewSetofComingMovies(3)).toBe(undefined);
    });
 
});