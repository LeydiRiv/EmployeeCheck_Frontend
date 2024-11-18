import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import {FormsModule} from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
  // imports: [FormsModule, NgxPaginationModule]
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  employees: any[] = []; // Array to store employee data
  displayedColumns: string[] = ['id', 'name', 'position', 'department', 'email', 'actions']; // Columns to display
  dataSource: MatTableDataSource<any>; // Data source for table

  @ViewChild(MatPaginator) paginator: MatPaginator; // Reference to paginator
  @ViewChild(MatSort) sort: MatSort; // Reference to sort functionality

  // Constructor to inject service and dialog reference
  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  // Method that runs when the component loads
  ngOnInit(): void {
    this.getAllEmployee(); // Call method to load employees when component initializes
  }

  // Method that runs after view is initialized
  ngAfterViewInit(): void {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator; // Set paginator for the table
      this.dataSource.sort = this.sort; // Set sort for the table
    }
  }

  // Method to retrieve all employees from the backend
  getAllEmployee(): void {
    this.employeeService.getEmployees().subscribe(response => {
      this.employees = response; // Store backend data in employees array
      this.dataSource = new MatTableDataSource(this.employees); // Assign data to table
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; // Set paginator after data load
      }
      if (this.sort) {
        this.dataSource.sort = this.sort; // Set sort after data load
      }
    });
  }

  // Handle page change event
  onPageChange(event: any): void {
    if (this.dataSource && this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = event.pageIndex; // Update page index
      this.dataSource.paginator.pageSize = event.pageSize; // Update page size
      this.getAllEmployee(); // Reload employee data
    }
  }

  // Open dialog for editing employee
  openEditDialog(employee: any): void {
    this.dialog.open(EmployeeEditComponent, {
      width: '400px', // Set width of dialog
      data: { employee } // Pass employee data to dialog
    });
  }

  // Delete an employee
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getAllEmployee(); // Refresh list after delete
    });
  }

  // Apply filter to table based on input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; // Get filter input
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply filter

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Go to first page after filter
    }
  }
}















  // -----------------------------------


// // Array to store employee data
//   employees: any[] = [];

//  //  Constructor to inject service and dialog reference 
//   constructor(private EmployeeService: EmployeeService, private dialog: MatDialog) { }


//   // Method that runs when the component loads
//   ngOnInit(): void {
//     this.getAllEmployee(); // Call method to load employees when component initializes
//   }



// // Method to open the edit dialog for a selected emoloyee
//   openEditDialog(employee: any): void {
//     console.log('Selected employee');  
//     if (employee) {
//       this.dialog.open(EmployeeEditComponent, {
//         width: '400px',  
//         data: { employee }  // Pass employee data to the dialog
//       });
//     } else {
//       console.error('Error! Employee is null');
//     }
//   }
  


//   // Method to retrieve all employees from the backend
//   getAllEmployee(): void{
//     this.EmployeeService.getEmployees().subscribe(
//       response=>{
//         this.employees = response; // Store backend data in employees array
//          console.log("List of all empployees: ",response)
//       }
//     );
//   }



//   // Delete employee
//   deleteEmployee(id: number) {
//     this.EmployeeService.deleteEmployee(id).subscribe(() => {
//       this.getAllEmployee(); // Refresh
//     });
//   }




