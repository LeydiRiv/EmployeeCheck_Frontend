import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrl: './check.component.css'
})
export class CheckComponent implements OnInit {



  employees: any[] = [];
  checkIns: any[] = [];
  //Ingresar datos a employee
  employee = { id: null, name: '', position: '', department: '', email: '' };
  checkInOut = { employeeId: null, action: 'checkin' }; //Verificar


   //Importante para inicializar
   ngOnInit(): void {
    this.loadCheckIns();
  }




  //Aqui guardaremos la información en la bd

    // //Mi constructor para hacer las llamadas al service || el segundo parametro es para cerrar los formularios y funcion del boton cancel
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
    return checkIn ? checkIn.checkInTime : 'N/A';
  }

  // Method to get checkOut from employee
  getEmployeeCheckOut(employee: any): string {
    const checkOut = employee.checkIns.find((ci: any) => ci.checkOutTime);
    return checkOut ? checkOut.checkOutTime : 'N/A';
  }





    
  // Method to register checkIn-checkOut
  onCheckInOutSubmit() {
    const { employeeId, action } = this.checkInOut;

    if (employeeId === null || employeeId === undefined) {
      console.log('Employee ID is required for this action.');
      return;
    }

    if (action === 'checkin') {
      this.EmployeeService.createCheckIn(employeeId).subscribe(() => {
        this.loadCheckIns();
        console.log(`Check-In for Employee ID ${employeeId} registered successfully!`);
      }, error => {
        console.error('Error during check-in:', error);
      });
    } else if (action === 'checkout') {
      this.EmployeeService.checkoutFromCheckInSystem(employeeId).subscribe(() => {
        this.loadCheckIns();
        console.time(`Check-Out for Employee ID ${employeeId} registered successfully!`);
      }, error => {
        console.error('Error during check-out:', error);
      });
    }
  }




//Para el boton de Cancel
  closeDialog() {
    this.dialogRef.close(); // Cierra el diálogo
  }





}
