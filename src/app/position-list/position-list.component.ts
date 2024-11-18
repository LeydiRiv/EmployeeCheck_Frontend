import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PositionEditComponent } from '../position-edit/position-edit.component';



@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.css'
})
export class PositionListComponent implements OnInit, AfterViewInit {

  positions: any[] = []; // Array to store positions data
  departments: any[] = []; // Array to store departments data
  dataSource: MatTableDataSource<any>; // Data source for table
  displayedColumns: string[] = ['id', 'name', 'departmentName', 'actions']; // Columns to display in the table
  
  @ViewChild(MatPaginator) paginator: MatPaginator; // Reference to paginator
  @ViewChild(MatSort) sort: MatSort; // Reference to sort functionality
  
  // Constructor to inject EmployeeService and dialog reference
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}
  
  // Method that runs when the component loads
  ngOnInit() {
    this.getDepartmentsAndPositions(); // Load departments and positions data
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
  
  // Load departments and positions from the backend
  getDepartmentsAndPositions() {
    this.employeeService.getDepartments().subscribe((departmentsData) => {
      this.departments = departmentsData; // Store departments data
  
      // After loading departments, load positions
      this.employeeService.getPositions().subscribe((positionsData) => {
        // Map through positions to find associated department
        this.positions = positionsData.map(position => {
          const department = this.departments.find(dep => dep.positions.some((pos: { id: any; }) => pos.id === position.id));
          return { ...position, departmentName: department ? department.name : 'N/A' }; // Add department name to position data
        });
  
        // Initialize MatTableDataSource with positions data
        this.dataSource = new MatTableDataSource(this.positions);
        
        // Set paginator and sort after data load
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
    });
  }
  
  // Delete a position
  deletePosition(positionId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this position?"); // Confirm deletion
    if (confirmDelete) {
      this.employeeService.deletePosition(positionId).subscribe(() => {
        this.getDepartmentsAndPositions(); // Refresh positions list after delete
      });
    }
  }
  
  // Edit a position
  editPosition(position: any) {
    const dialogRef = this.dialog.open(PositionEditComponent, {

      data: { position } // Pass position data to dialog
    });
  
    // After dialog is closed, refresh the positions list
    dialogRef.afterClosed().subscribe(() => {
      this.getDepartmentsAndPositions();
    });
  }
  
  // Filter data in the table based on input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; // Get filter input
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply filter to data source
  
    // Go to first page after applying the filter
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
      this.getDepartmentsAndPositions(); // Reload data based on new page selection
    }
  }
  



  


}