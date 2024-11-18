import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, HttpClientModule } from '@angular/common/http';  // Add withFetch for allow fetch APIs


import { FormsModule } from '@angular/forms';  // Import FormsModule for the Forms


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar'; //Module
import {MatIconModule} from '@angular/material/icon'; //Icon
import {MatButtonModule} from '@angular/material/button'; //Boton
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; //Input
import {MatRadioModule} from '@angular/material/radio'; //Radio
import {MatSelectModule} from '@angular/material/select';
// import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {MatTableModule} from '@angular/material/table'; //Para las tablas y la paginación




//components
import { EmployeeComponent } from './employee/employee.component';
import { CheckComponent } from './check/check.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CheckListComponent } from './check-list/check-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { DepartmentPositionComponent } from './department-position/department-position.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { PositionEditComponent } from './position-edit/position-edit.component';
import { PositionListComponent } from './position-list/position-list.component';
import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import {MatMenuModule} from '@angular/material/menu';
import { CheckDepartmentListComponent } from './check-department-list/check-department-list.component';
// import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [  
    AppComponent,
    EmployeeComponent,
    CheckComponent,
    EmployeeListComponent,
    CheckListComponent,
    EmployeeEditComponent,
    DepartmentPositionComponent,
    DepartmentListComponent,
    DepartmentEditComponent,
    PositionEditComponent,
    PositionListComponent,
    DepartmentComponent,
    PositionComponent,
    CheckDepartmentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule, 
    MatIconModule, //icon
    MatButtonModule, //Boton
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule, //select
    ReactiveFormsModule, //Reactive Form
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatMenuModule,
    NgxPaginationModule,
    HttpClientModule,
    MatTableModule,
  
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  schemas: [NO_ERRORS_SCHEMA],  // Agrega esto aquí
  bootstrap: [AppComponent]
})
export class AppModule { }
