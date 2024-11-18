import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit, AfterViewInit {

 
  departments: any[] = []; // Array to store departments data
  dataSource: MatTableDataSource<any>; // Data source for table
  displayedColumns: string[] = ['id', 'name', 'actions']; // Columns to display in the table

  @ViewChild(MatPaginator) paginator: MatPaginator; // Reference to paginator
  @ViewChild(MatSort) sort: MatSort; // Reference to sort functionality

  // Constructor to inject service and dialog reference
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  // Method that runs when the component loads
  ngOnInit() {
    this.getDepartments(); // Load departments data
  }

  // Method that runs after view is initialized
  ngAfterViewInit(): void {
    // Verify paginator and sort are available before assigning to dataSource
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator; // Set paginator for table
    }
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort; // Set sort for table
    }
  }

  // Load list of departments from the backend
  getDepartments() {
    this.employeeService.getDepartments().subscribe((data: any[]) => {
      this.departments = data; // Store backend data in departments array
      this.dataSource = new MatTableDataSource(this.departments); // Initialize data source with departments

      // Ensure paginator and sort are set after dataSource initialization
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  // Delete a department
  deleteDepartment(departmentId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this department?"); // Confirm deletion
    if (confirmDelete) {
      this.employeeService.deleteDepartment(departmentId).subscribe(() => {
        this.getDepartments(); // Refresh list after delete
      }, error => {
        console.error('Failed to delete department ', error); // Log error if delete fails
      });
    }
  }

  // Edit a department
  editDepartment(department: any) {
    const dialogRef = this.dialog.open(DepartmentEditComponent, {
      data: { department } // Pass department data to dialog
    });
  }

  // Filter data in the table based on input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; // Get filter input
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply filter

    // Go to first page after applying filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Handle page change event
  onPageChange(event: any): void {
    // Check paginator is available before using it
    if (this.dataSource && this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = event.pageIndex; // Update page index
      this.dataSource.paginator.pageSize = event.pageSize; // Update page size
      this.getDepartments(); // Reload data based on new page selection
    }
  }

}
