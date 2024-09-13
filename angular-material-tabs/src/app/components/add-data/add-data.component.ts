import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService } from '../../service/data.service'; // Import the service
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Format used when parsing
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Format used when displaying
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class MyDateAdapter extends NativeDateAdapter {
  // Custom date adapter if needed
}
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {
  dataForm: FormGroup;
  dataEntries: { datetime: Date, temperature: number }[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dataForm = this.fb.group({
      datetime: ['', [Validators.required, this.pastDateValidator]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }

  pastDateValidator(control: any) {
    const inputDate = new Date(control.value);
    const now = new Date();
    return inputDate < now ? null : { notPast: true };
  }

  addData() {
    if (this.dataForm.valid) {
      const formValue = this.dataForm.value;
      this.dataService.addData({
        datetime: formValue.datetime,
        temperature: formValue.temperature
      });
      this.dataForm.reset(); // Reset the form after submission
    }
  }

}
