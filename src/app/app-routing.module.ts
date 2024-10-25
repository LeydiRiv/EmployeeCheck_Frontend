import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component'; //Siempre es importante verificar si existen los modulos o importaciones
import { CheckListComponent } from './check-list/check-list.component'; //importamos componente checkin


//Modificxamos esto para especificar la ruta principal de abajo
const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'check-list', component: CheckListComponent },
  { path: '', redirectTo: '/employee-list', pathMatch: 'full' }
  // { path: '', redirectTo: '/check-list', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
