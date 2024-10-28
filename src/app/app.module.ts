import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Add withFetch for allow fetch APIs


import { FormsModule } from '@angular/forms';  // Import FormsModule for the Forms


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar'; //Module
import {MatIconModule} from '@angular/material/icon'; //Icon
import {MatButtonModule} from '@angular/material/button'; //Boton
// import {MatDialogModule} from '@angular/material/dialog'; //Dialog
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'; //es el form field para el formulario
import {MatInputModule} from '@angular/material/input'; //para solucionar el error de entrada
import {MatRadioModule} from '@angular/material/radio'; //Importamos el button radio de material




//components
import { EmployeeComponent } from './employee/employee.component';
import { CheckComponent } from './check/check.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CheckListComponent } from './check-list/check-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component'; //importamos componente checkin



@NgModule({
  declarations: [  //Importante, importar los componentes tanto arriba como especificarlos aqui
    AppComponent,
    EmployeeComponent,
    CheckComponent,
    EmployeeListComponent,
    CheckListComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule, //Agregamos esto
    MatIconModule, //icon
    MatButtonModule, //Boton
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
