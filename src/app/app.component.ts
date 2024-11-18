import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

//Components
import { EmployeeComponent } from './employee/employee.component';
import { CheckComponent } from './check/check.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'; 
import { CheckListComponent } from './check-list/check-list.component'; 
import { EmployeeEditComponent } from './employee-edit/employee-edit.component'; 

import { DepartmentPositionComponent } from './department-position/department-position.component'; 
import { DepartmentListComponent } from './department-list/department-list.component'; 
import { DepartmentEditComponent } from './department-edit/department-edit.component'; 
import { PositionListComponent } from './position-list/position-list.component'; 
import { PositionEditComponent } from './position-edit/position-edit.component';
import { PositionComponent } from './position/position.component';
import { DepartmentComponent } from './department/department.component';
import { CheckDepartmentListComponent } from './check-department-list/check-department-list.component';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CheckSystem';


  constructor(private _dialog: MatDialog) { }

  openAddEditEmployee() {
    this._dialog.open(EmployeeComponent);
  }

  openAddDepartment() {
    this._dialog.open(DepartmentComponent);
  }

  openAddPosition() {
    this._dialog.open(PositionComponent);
  }


  openAddCheckIn() {
    this._dialog.open(CheckComponent);
  }

  openAddEmployeeList() {
    this._dialog.open(EmployeeListComponent);
  }

  openAddCheckList() {
    this._dialog.open(CheckListComponent);
  }

  openEmployeeEdit(position: any) {
    this._dialog.open(PositionEditComponent, {
      data: { position: position }
    })
  }


  openDepartmentPosition() {
    this._dialog.open(DepartmentPositionComponent);
  }

  openDepartmentList() {
    this._dialog.open(DepartmentListComponent);
  }

  openDepartmentEdit(department: any) {
    this._dialog.open(DepartmentEditComponent, {
      data: { department: department }
    })
  }

  openPositionEdit(position: any) {
    this._dialog.open(PositionEditComponent, {
      data: { position: position }
    })
  }


  openPositionList() {
    this._dialog.open(PositionListComponent);
  }

  openCheckDepartmentList() {
    this._dialog.open(CheckDepartmentListComponent);
  }

}
