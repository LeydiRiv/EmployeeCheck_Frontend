import { Component, OnInit } from '@angular/core';
// import { EmployeeListComponent } from './employee-list/employee-list.component'; //importamos componente checkin
// import { EmployeeService } from '../services/employee.service';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component'; //importamos componente checkin
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../services/api.service';
import { response } from 'express';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
[x: string]: any;

  employees: any[] = [];
  // checkIns: any[] = []; // CODIGO OBSOLETO PERO VERIFICAR PARA EVITAR CONFLICTOS
  
  // dialog: any;
  // //Ingresar datos a employee
  // employee = { id: null, name: '', position: '', department: '', email: '' };
  // checkInOut = { employeeId: null, action: 'checkin' }; //Verificar

  constructor(private EmployeeService: EmployeeService, private dialog: MatDialog) { }

  openEditDialog(employee: any): void {
    console.log('Empleado seleccionado:', employee);  // Verificar si el objeto es null o tiene datos correctos
    if (employee) {
      this.dialog.open(EmployeeEditComponent, {
        width: '400px',  // Ajusta el tamaño del diálogo si es necesario
        data: { employee }  // Pasa los datos del empleado al diálogo
      });
    } else {
      console.error('Empleado es null o indefinido');
    }
  }
  

  // metod que se ejecuta al cargar el componente
  ngOnInit(): void {
    this.getAllEmployee(); // Llamamos al method al inicializar el componente
  }


// Este de status  CODIGO OBSOLETO
  // // Get the status from employee (checkin
  // getEmployeeCheckInStatus(employee: any): string {
  //   const lastCheckIn = employee.checkIns.length > 0 ? employee.checkIns[employee.checkIns.length - 1] : null;
  //   return lastCheckIn && lastCheckIn.status ? 'True' : 'False';
  // }


  // CODIGO OBSOLETO
  // // Method to get the checkIn from employee
  // getEmployeeCheckIn(employee: any): string {
  //   const checkIn = employee.checkIns.find((ci: any) => ci.checkInTime);
  //   return checkIn ? checkIn.checkInTime : 'N/A';
  // }

  // // Method to get checkOut from employee
  // getEmployeeCheckOut(employee: any): string {
  //   const checkOut = employee.checkIns.find((ci: any) => ci.checkOutTime);
  //   return checkOut ? checkOut.checkOutTime : 'N/A';
  // }

  //Creo que response es data
  getAllEmployee(): void{
    this.EmployeeService.getEmployees().subscribe(
      response=>{
        this.employees = response; //almaceno los datos del backend en employee para imprimir employee
         console.log("Lista de todos los empleados",response)
      }
    );
  }



  // Delete employee
  deleteEmployee(id: number) {
    this.EmployeeService.deleteEmployee(id).subscribe(() => {
      this.getAllEmployee(); 
    });
  }



}
