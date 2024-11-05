import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
// import { MatDialog } from '@angular/material/dialog';
// import { CreateEditDepartmentDialogComponent } from '../create-edit-department-dialog/create-edit-department-dialog.component';
import { DepartmentEditComponent } from '../department-edit/department-edit.component'; //Le agregamos un . adicional para que pueda acceder a la ubicación
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';





@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit {


  departments: any[] = [];
  // dialog: any;


  //  Constructor to inject service and dialog reference 
  constructor(private EmployeeService: EmployeeService, public dialog: MatDialog) { }

  // constructor(private EmployeeService: EmployeeService, private appComponent: AppComponent, public dialog: MatDialog) { }


  ngOnInit() {
    this.getDepartments();
  }

  // Method to get the list of departments
  getDepartments() {
    this.EmployeeService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }



  // Method to delete a check-in entry
  deleteDepartment(departmentId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this department?");
    if(confirmDelete){

      this.EmployeeService.deleteDepartment(departmentId).subscribe(() => {
        this.getDepartments(); //refresh list
      }, error => {
        console.error('Failed to delete a department ', error);
      });

    }
    
  }

  
// Method to edit a department 
  editDepartment(department: any) {
    const dialogRef = this.dialog.open(DepartmentEditComponent, {
      width: '300px', // Set dialog width
      data: { department: department } // Pass department data to the dialog
    });
  }
  
}
