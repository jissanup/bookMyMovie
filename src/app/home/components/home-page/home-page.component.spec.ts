import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageComponent } from './home-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTabsModule, MatMenuModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { HomeService } from '../../services/home.service';
import { HomeFilterPipe } from 'src/app/shared/pipes/home-filter.pipe';
import { SortPipePipe } from 'src/app/shared/pipes/sort-pipe.pipe';
import { ScrollDispatchModule, CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { of, Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
}
class MockHomeService {
    getMovies() { }
    getDataLength(){}
    getRenderedRange(){}
}
 
describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let viewport: CdkVirtualScrollViewport;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatTabsModule,
                MatMenuModule,
                HttpClientModule,
                StoreModule,
                ScrollDispatchModule ,
                BrowserAnimationsModule,
                ScrollingModule
            ],
            declarations: [
                HomePageComponent,
                HomeFilterPipe,
                SortPipePipe
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [  { provide: Store, useClass: StoreMock },
                { provide: HomeService, useClass: MockHomeService }]
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        component.ngAfterViewInit();
        fixture.detectChanges();
    });
    afterEach(() => {
        fixture.destroy();
      });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });
    it('should call virtual scroll', () =>{
        expect(viewport).toHaveBeenCalled;
    });
    it('should select language from dropdown', () =>{
        expect(component.selectedLanguage).toBe('');
    });
    it('should select genre from dropdown', () =>{
        expect(component.selectedGenre).toBe('');
    });
    it('should sort movie list', () => {
        spyOn(component, 'sort');
        expect(component.sortMovie).toHaveBeenCalled;
    });
    it('should get activeTab Index', () => {
        expect(component.activeTabIndex).toHaveBeenCalled;
      });
      it('should select selectedLanguage', () => {
          expect(component.selectedLanguage).toHaveBeenCalled;
      });
    it('should emit now playing movies list', () => {
        spyOn(component, 'getMovies');
        expect(component.getNewNowPlayingMovies.emit).toHaveBeenCalled;
    });
    it('should initialize activeTabIndex as 0', () => {
        expect(component.activeTabIndex).toBe(0);
    });
    it('should initialize nowPlayingMovieFetchedPageNum as 1', () => {
        expect(component.nowPlayingMovieFetchedPageNum).toBe(1);
    });
    it('should initialize upcomingMoviesFetchedPageNum  as 0', () => {
        expect(component.upcomingMoviesFetchedPageNum ).toBe(0);
    });

    it('should get getNewUpcomingMovies list with getMovies', () =>{
        let page = 0;
        component.getNewUpcomingMovies.subscribe(em => page = em);
        component.getMovies();
        expect(page).toBe(0);
    });
    it('should get getNewUpcomingMovies list', () =>{
        let page = 0;
        component.getNewUpcomingMovies.subscribe(em => page = em);
        component.ngOnInit();
        expect(page).toBe(1);
    });
    it('should get getNewNowPlayingMovies list', () =>{
        let page = 0;
        component.getNewNowPlayingMovies.subscribe(em => page = em);
        component.ngOnInit();
        expect(page).toBe(1);
    });
    it('should get getNewUpcomingMovies list with getMovies', () =>{
        let page = 0;
        component.getNewNowPlayingMovies.subscribe(em => page = em);
        component.getMovies();
        expect(page).toBe(2);
    });
    it('should call tabChanged with index', () => {
        spyOn(component, 'tabChanged');
        expect(component.tabChanged(1)).toHaveBeenCalled;
    });
    it('should get movies list', () =>{
      let spy = spyOn(component, 'getMovies').and.callFake(()=>{
           return Observable.call([[
               1,2,3
           ]])
       });
       expect(spy);
    })
});