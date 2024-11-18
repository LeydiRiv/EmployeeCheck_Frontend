// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../services/api.service';

import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/api.service';


@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrl: './check-list.component.css'
})
export class CheckListComponent implements OnInit, AfterViewInit {


  employees: any[] = []; // Array to store employee data
  checkIns: any[] = []; // Array to store check-in data
  
  // MatTableDataSource to enable pagination, filtering, and sorting
  dataSource: MatTableDataSource<any>;
  
  // Columns to display in the table
  displayedColumns: string[] = ['id', 'employee', 'checkInTime', 'checkOutTime', 'status', 'actions'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator; // Reference to paginator
  @ViewChild(MatSort) sort: MatSort; // Reference to sort functionality
  
  // Constructor to inject EmployeeService
  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.loadChecks(); // Load check-ins and employees when component initializes
  }
  
  // Method that runs after view is initialized
  ngAfterViewInit(): void {
    // Verify paginator and sort are available before assigning to dataSource
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator; // Set paginator for the table
    }
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort; // Set sort for the table
    }
  }
  
  // Load employees and check-ins
  loadChecks() {
    // Get employees from backend
    this.employeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data; // Store employees data
      console.log('Loading employees', this.employees); // Log loaded employees
      this.loadCheckIns(); // Load check-ins after employees are loaded
    });
  }
  
  // Get check-ins from backend
  loadCheckIns() {
    this.employeeService.getCheckIns().subscribe((data: any[]) => {
      console.log('Check-ins:', data); // Log loaded check-ins
      this.checkIns = data; // Store check-ins data
      this.dataSource = new MatTableDataSource(this.checkIns); // Initialize data source with check-ins
  
      // Set paginator and sort after data source is initialized
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }
  
  // Get the name of the employee who made the check-in
  getEmployeeName(checkId: number): string {
    // Find employee associated with the check-in ID
    const employee = this.employees.find(emp => emp.checkIns.some((ci: { id: number; }) => ci.id === checkId));
    return employee ? employee.name : 'Unknown'; // Return employee name or 'Unknown' if not found
  }
  
  // Delete a check-in
  deleteCheckIn(id: number) {
    this.employeeService.deleteCheckIn(id).subscribe(() => {
      this.loadCheckIns(); // Refresh check-ins list 
    });
  }
  
  // Filter data in the table based on input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; // Get filter input
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply filter
  
    // Go to the first page after applying filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  // Handle page change event
  onPageChange(event: any): void {
    // Verify paginator is available before using it
    if (this.dataSource && this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = event.pageIndex; // Update page index
      this.dataSource.paginator.pageSize = event.pageSize; // Update page size
      this.loadCheckIns(); // Reload data based on new page selection
    }
  }


//Method to register a checkOut
  methodCheckOut(id: number){
    this.employeeService.checkoutFromCheckInSystem(id).subscribe(() => {
      this.loadCheckIns(); //  Refresh check-ins list 
      console.log(`Check-Out for Employee ID ${id} registered successfully!`);
    }, error => {
      console.error('Error during check-out:', error);
    });
  }




}












