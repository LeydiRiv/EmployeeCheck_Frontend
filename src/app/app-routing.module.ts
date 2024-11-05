import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component'; 
import { CheckListComponent } from './check-list/check-list.component'; 
import { DepartmentListComponent } from './department-list/department-list.component'; 
import { PositionListComponent } from './position-list/position-list.component'; 



//Routes
const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'check-list', component: CheckListComponent },
  { path: 'department-list', component: DepartmentListComponent },
  { path: 'position-list', component: PositionListComponent },

  { path: '', redirectTo: '/employee-list', pathMatch: 'full' }
  // { path: '', redirectTo: '/check-list', pathMatch: 'full' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
