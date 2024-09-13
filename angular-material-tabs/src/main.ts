import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import 'chartjs-adapter-date-fns';
import { MatTabsModule } from '@angular/material/tabs'; // Import Angular Material Tabs module
import { MatInputModule } from '@angular/material/input'; // Import Angular Material Input module
import { MatButtonModule } from '@angular/material/button'; // Import Angular Material Button module
import { MatFormFieldModule } from '@angular/material/form-field'; // Import Angular Material Form Field module
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import Angular Material Datepicker module
import { MatNativeDateModule } from '@angular/material/core'; // Import Angular Material Core module for Datepicker
import { AppComponent } from './app/app.component';
import { AddDataComponent } from './app/components/add-data/add-data.component';
import { ViewDataComponent } from './app/components/view-data/view-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Define routes
const routes = [
  { path: '', component: AddDataComponent },
  { path: 'app-view-data', component: ViewDataComponent },
];

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      RouterModule,
      MatTabsModule,
      MatInputModule,
      MatButtonModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      BrowserAnimationsModule
    )
  ],
});
