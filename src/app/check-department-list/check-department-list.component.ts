import { EmployeeService } from '../services/api.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-check-department-list',
  templateUrl: './check-department-list.component.html',
  styleUrl: './check-department-list.component.css'
})
export class CheckDepartmentListComponent implements OnInit {


  departmentRoles: any[] = [];
  dataSource: MatTableDataSource<any>; // Data source for the Angular Material table
  displayedColumns: string[] = ['department', 'role', 'person', 'status']; // Columns displayed in the table

  @ViewChild(MatPaginator) paginator: MatPaginator; // Reference to paginator
  @ViewChild(MatSort) sort: MatSort; // Reference to sort functionality

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loadTableData();
  }

  ngAfterViewInit(): void {
    // Set paginator and sort after view is initialized
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  // Function loads the table data and processes it
  loadTableData() {
    console.log('Loading');

    this.employeeService.getEmployees().subscribe(employees => {
      console.log('Employees', employees);

      this.departmentRoles = employees.map(employee => {
        // Check if the employee has any check-ins and get the last one if available

        const lastCheckIn = employee.checkIns && employee.checkIns.length > 0
          ? employee.checkIns[employee.checkIns.length - 1]
          : null;

        console.log('Data: ', lastCheckIn);

        // Return a new object with the required information

        return {
          person: employee.name,
          department: employee.department,
          role: employee.position,
          status: lastCheckIn && lastCheckIn.status ? true : false // Show true or false based on status
        };
      });

      // Initialize the MatTableDataSource with the processed data
      this.dataSource = new MatTableDataSource(this.departmentRoles);

      // Assign paginator and sorting to the table, if available
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }

      console.log('Final: ', this.departmentRoles);
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any): void {
    if (this.dataSource && this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = event.pageIndex;
      this.dataSource.paginator.pageSize = event.pageSize;
    }
  }


}
