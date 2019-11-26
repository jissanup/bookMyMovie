import { TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AddTheaterComponent } from './add-theater.component';
import { MatDialog } from '@angular/material';
import { AdminService } from '../../services/admin.service';
import { HttpClientModule } from '@angular/common/http';

 class MockAdminService {
    onSubmit() { }
    dialogOk() { }
    }

describe('AddTheaterComponent', () => {
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
                BrowserAnimationsModule,
                HttpClientModule
            ],
            declarations: [
                AddTheaterComponent
            ],
            providers: [
                { provide: MatDialog, useValue: matDialogStub },
                { provide: AdminService, useClass: MockAdminService },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(AddTheaterComponent);
        component = fixture.debugElement.componentInstance;
        submitEl = fixture.debugElement.query(By.css('button'));
        
    });
    beforeEach(() => {
        component.ngOnInit();
    });

    it('should create a component', async () => {
        expect(component).toBeTruthy();
    });

    it('should run ngOnInit()', async () => {
        spyOn(component, 'ngOnInit');
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should run onSubmit() for invaild form', async () => {
        let tid = component.newTheater.controls['tid'];
        expect(tid.valid).toBeFalsy();
        let name = component.newTheater.controls['name'];
        expect(name.valid).toBeFalsy();
        let city = component.newTheater.controls['city'];
        expect(city.valid).toBeFalsy();
        let gLocation = component.newTheater.controls['gLocation'];
        expect(gLocation.valid).toBeFalsy();
        let capacity = component.newTheater.controls['capacity'];
        expect(capacity.valid).toBeFalsy();
    });

    it('should run onSubmit() for valid form', async () => {
        let theater;
        component.newTheater.controls['tid'].setValue('tid');
        component.newTheater.controls['name'].setValue('name');
        component.newTheater.controls['city'].setValue('city');
        component.newTheater.controls['gLocation'].setValue('gLocation');
        component.newTheater.controls['capacity'].setValue('capacity');
        component.addTheater.subscribe((value) => theater = value);
        submitEl.triggerEventHandler('click', null);
    });

    it('should run dialogOk()', async () => {
        const result = component.dialogOk();
        spyOn(TestBed.get(MatDialog), 'closeAll').and.callThrough();
    });

});