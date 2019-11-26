import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTableModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';

const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSnackBarModule,
  ScrollingModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule, 
  MatCardModule, 
  MatCheckboxModule,
  CdkTableModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule { }
