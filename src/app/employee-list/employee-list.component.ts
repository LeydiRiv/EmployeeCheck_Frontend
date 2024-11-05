import { Component, OnInit, ViewChild} from '@angular/core';
// import { EmployeeListComponent } from './employee-list/employee-list.component'; 
// import { EmployeeService } from '../services/employee.service';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component'; 
import { MatDialog } from '@angular/material/dialog';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { EmployeeService } from '../services/api.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {


// Array to store employee data
  employees: any[] = [];

 //  Constructor to inject service and dialog reference 
  constructor(private EmployeeService: EmployeeService, private dialog: MatDialog) { }


  // Method that runs when the component loads
  ngOnInit(): void {
    this.getAllEmployee(); // Call method to load employees when component initializes
  }



// Method to open the edit dialog for a selected emoloyee
  openEditDialog(employee: any): void {
    console.log('Selected employee');  
    if (employee) {
      this.dialog.open(EmployeeEditComponent, {
        width: '400px',  
        data: { employee }  // Pass employee data to the dialog
      });
    } else {
      console.error('Error! Employee is null');
    }
  }
  


  // Method to retrieve all employees from the backend
  getAllEmployee(): void{
    this.EmployeeService.getEmployees().subscribe(
      response=>{
        this.employees = response; // Store backend data in employees array
         console.log("List of all empployees: ",response)
      }
    );
  }



  // Delete employee
  deleteEmployee(id: number) {
    this.EmployeeService.deleteEmployee(id).subscribe(() => {
      this.getAllEmployee(); // Refresh
    });
  }



}
