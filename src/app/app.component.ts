import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//Components
import { EmployeeComponent } from './employee/employee.component';
import { CheckComponent } from './check/check.component'; 
import { EmployeeListComponent } from './employee-list/employee-list.component'; //importamos componente checkin
import { CheckListComponent } from './check-list/check-list.component'; //importamos componente checkin
import { EmployeeEditComponent } from './employee-edit/employee-edit.component'; //importamos componente checkin




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CheckSystem';


  // comando india

    constructor(private _dialog: MatDialog) {}

      openAddEditEmployee(){
        this._dialog.open(EmployeeComponent);
      }

      openAddCheckIn(){
        this._dialog.open(CheckComponent);
      }

      openAddEmployeeList(){
        this._dialog.open(EmployeeListComponent);
      }

      openAddCheckList(){
        this._dialog.open(CheckListComponent);
      }

      openEmployeeEdit(){
        this._dialog.open(EmployeeEditComponent);
      }



  

}
