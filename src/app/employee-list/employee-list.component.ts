import { Component, OnInit } from '@angular/core';
// import { EmployeeListComponent } from './employee-list/employee-list.component'; //importamos componente checkin
// import { EmployeeService } from '../services/employee.service';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component'; 
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
