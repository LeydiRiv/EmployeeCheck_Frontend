import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';


@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrl: './check-list.component.css'
})
export class CheckListComponent implements OnInit {

  // Array to store employee data
  employees: any[] = [];
  // Array to store Check data
  checkIns: any[] = [];

// Variable to store the name of the last accessed employee
  empleadoAnterior: string = 'Unknown Employee';


  // Constructor to inject service for backend data access
  constructor(private EmployeeService: EmployeeService) { }

  ngOnInit() {
    this.loadChecks();
  }

  //Load the data for employees and check-Ins - Aqui basicamente traemos la informacon
  loadChecks() {
    // This call the service to get employees from backend
    this.EmployeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data; // Save data
      console.log('Loading employees', this.employees); //Verify data loading
      this.loadCheckIns(); //
    });
  }

  // Get the name of the employee who performed a specific check-in
getEmployeeName(checkId: number): string { 
  // Search for the employee who has the current check-in in their check-in list
  const employee = this.employees.find(emp => emp.checkIns.some((ci: { id: number; }) => ci.id === checkId));
  
  if (employee) {
    this.empleadoAnterior = employee.name; // Update last accessed name
    return employee.name;
  } else {
    return this.empleadoAnterior; // Return last accessed name if not found
  }
}



  // Get the checkIns list
  loadCheckIns() {
    this.EmployeeService.getCheckIns().subscribe((data: any[]) => {
      console.log('Check-ins:', data);  // Log check-in data to verify
      this.checkIns = data; // Assign the data received from the backend to checkIns
    });
  }


// Method to delete a check-in entry
  deleteCheckIn(id: number) {
    this.EmployeeService.deleteCheckIn(id).subscribe(() => {
      this.loadCheckIns(); //refresh list
    }, error => {
      console.error('Failed to delete check-in entry ', error);
    });
  }




}
