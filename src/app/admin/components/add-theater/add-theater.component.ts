import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.scss']
})
export class AddTheaterComponent implements OnInit {

  newTheater = this.fb.group({
    tid: ['', {
      validators: [Validators.required],
      updateOn: 'blur'}
    ],
    name: ['', Validators.required],
    city: ['', Validators.required],
    gLocation: ['', Validators.required],
    capacity: ['', Validators.required]
  });

  @Output() addTheater = new EventEmitter();
  @ViewChild('successDialog') successDialog: TemplateRef<any>;

  constructor(private fb: FormBuilder, private matDialog: MatDialog) {
  }

  ngOnInit() {
  }
  onSubmit() {
    if (this.newTheater.valid) {
      this.matDialog.open(this.successDialog);
      this.addTheater.emit(this.newTheater.value);   
    }
  }
  dialogOk() {
    this.newTheater.reset();
    this.matDialog.closeAll();
  }
}
