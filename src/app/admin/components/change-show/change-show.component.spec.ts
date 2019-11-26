import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { ChangeShowComponent } from './change-show.component';
import { MatDialog } from '@angular/material';
import { AdminService } from '../../services/admin.service';

class MockAdminService {
    addMovie(movie){ }
    save() { }
    cancel() {}
    dialogOk() {}
    }

describe('ChangeShowComponent', () => {
    let fixture;
    let component;
    let submitEl: DebugElement;

    beforeEach(() => {
        const matDialogStub = { open: () => ({}),
    closeAll:()=>{} };
        TestBed.configureTestingModule({
            imports: [
                FormsModule, 
                ReactiveFormsModule, 
                MatDialogModule, 
                BrowserAnimationsModule
            ],
            declarations: [
                ChangeShowComponent
            ],
            providers: [
                { provide: MatDialog, useValue: matDialogStub },
                { provide: AdminService, useClass: MockAdminService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
      
        
    });
    beforeEach(() =>{
        fixture = TestBed.createComponent(ChangeShowComponent);
        component = fixture.componentInstance;
        submitEl = fixture.debugElement.query(By.css('button'));
        component.ngOnInit();
    })

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });
   
    it('should call dialogOk function', async () => {
        spyOn(TestBed.get(MatDialog), 'closeAll').and.callThrough();
        expect(component.dialogOk()).toHaveBeenCalled;
    });
    it('should add movies list', () =>{
        let spy = spyOn(component, 'addMovie');
         expect(spy);
      });
      it('should movies when addMovie called', () => {
        component.addMovie('movie');
        expect(component.addMovie.length).toBe(1);
    });
    it('should clear current showing movie list when cancel called', () => {
        component.cancel();
        expect(component.cancel.length).toBe(0);
    });
});