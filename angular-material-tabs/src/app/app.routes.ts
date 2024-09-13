
import { Routes } from '@angular/router';
import { AddDataComponent } from './components/add-data/add-data.component';
import { ViewDataComponent } from './components/view-data/view-data.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app-add-data', pathMatch: 'full' },
  { path: 'app-add-data', component: AddDataComponent },
  { path: 'app-view-data', component: ViewDataComponent }
];
