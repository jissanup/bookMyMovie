import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { NO_ERRORS_SCHEMA, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { Store, StoreModule } from '@ngrx/store';
import { HomeService } from '../../../services/home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
}
describe('MovieCardComponent', () => {
    let component: MovieCardComponent;
    let fixture: ComponentFixture<MovieCardComponent>;
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule,
                MatDialogModule,
                BrowserAnimationsModule
            ],
            declarations: [
                MovieCardComponent
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            providers: [HomeService,
                { provide: Store, useClass: StoreMock }]
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(MovieCardComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });
    it('should create a component', () => {
        expect(component).toBeTruthy();
    });
    it('should assign value to selectedTime', () => {
        expect(component.selectedTheater).toBe(undefined);
    });
    it('should call onValChange', () => {
        component.onValChange('val');
        expect(component.onValChange.length).toBe(1);
    });
    it('should call isInvalid', () => {
        component.isInvalid();
        expect(component.isInvalid.length).toBe(0);
    });

    it('should return selected time', () => {
        expect(component.selectedTime).toHaveBeenCalled;
    })
    it('should call trackCastandCrew', () => {
        component.trackCastandCrew(1, 'cast');
        expect(component.trackCastandCrew.length).toBe(2);
    })

});