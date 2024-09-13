import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViewDataComponent, AddDataComponent,MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-material-tabs';
}
