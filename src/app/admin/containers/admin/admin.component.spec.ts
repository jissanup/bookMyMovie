import {TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminService } from '../../services/admin.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
} 

describe('AdminComponent', () => {
    let fixture;
    let component;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                AdminComponent
            ],
            providers: [
               AdminService,
                { provide: Store, useClass: StoreMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });
    beforeEach(() =>{
        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    })

    it('should create a component', () => {
        expect(component).toBeTruthy();
    });

    it('should add movies list', () =>{
        let spy = spyOn(component, 'addTheater');
         expect(spy);
      });
      it('should movies when addTheater called', () => {
        component.addTheater('movie');
        expect(component.addTheater.length).toBe(1);
    });

});