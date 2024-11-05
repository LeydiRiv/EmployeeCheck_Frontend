import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrl: './check.component.css'
})
export class CheckComponent implements OnInit {


// Array to store employee data, check-in and checkout data
  employees: any[] = [];
  checkIns: any[] = [];

  //Employee for form input with default values
  employee = { id: null, name: '', position: '', department: '', email: '' };
  checkInOut = { employeeId: null, action: 'checkin' }; //Verificar


   //Load check-ins when component initializes
   ngOnInit(): void {
    this.loadCheckIns();
  }


  //  Constructor to inject service and dialog reference 
    constructor(private EmployeeService: EmployeeService, private dialogRef: MatDialogRef<CheckComponent>) { }


    // Get the checkIns list
    loadCheckIns() {
      this.EmployeeService.getCheckIns().subscribe((data: any[]) => {
        this.checkIns = data; // Assign the data received from the backend to checkIns
      });
    }

  // Method to get the checkIn from employee
  getEmployeeCheckIn(employee: any): string {
    const checkIn = employee.checkIns.find((ci: any) => ci.checkInTime);
    return checkIn ? checkIn.checkInTime : 'N/A'; // Return check-in time if available, otherwise N/A
  }

  // Method to get checkOut from employee
  getEmployeeCheckOut(employee: any): string {
    const checkOut = employee.checkIns.find((ci: any) => ci.checkOutTime);
    return checkOut ? checkOut.checkOutTime : 'N/A';   // Return check-in time if available, otherwise N/A

  }





    
  // Method to register checkIn-checkOut
  onCheckInOutSubmit() {
    // Get values of employeeId an Action
    const { employeeId, action } = this.checkInOut; //Create a employee, EMPLOYEE

    // Validate the employeeId
    if (employeeId === null || employeeId === undefined) {
      console.log('Employee ID is required for this action.');
      return;
    }

    // Perform check-in action
    if (action === 'checkin') {
      this.EmployeeService.createCheckIn(employeeId).subscribe(() => {
        this.loadCheckIns();
        console.log(`Check-In for Employee ID ${employeeId} registered successfully!`);
      }, error => {
        console.error('Error during check-in:', error);
      });
    
// Perform check-out action
    } else if (action === 'checkout') {
      this.EmployeeService.checkoutFromCheckInSystem(employeeId).subscribe(() => {
        this.loadCheckIns();
        console.time(`Check-Out for Employee ID ${employeeId} registered successfully!`);
      }, error => {
        console.error('Error during check-out:', error);
      });
    }
  }




// Method to close the dialog
  closeDialog() {
    this.dialogRef.close(); // Closes the dialog
  }

}
