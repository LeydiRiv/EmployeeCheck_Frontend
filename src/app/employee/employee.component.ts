import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  //Importante para inicializar
  ngOnInit(): void {
    this.loadEmployees();

  }

  //   // Logica

  //   //Este componente es unicamente para ingresar datos a la tabla

  employees: any[] = [];
  //Ingresar datos a employee
  employee = { id: null, name: '', position: '', department: '', email: '' };

  // //Mi constructor para hacer las llamadas al service || el segundo parametro es para cerrar los formularios y funcion del boton cancel
  constructor(private EmployeeService: EmployeeService, private dialogRef: MatDialogRef<EmployeeComponent>) { }


  closeDialog() {
    this.dialogRef.close(); // Cierra el diálogo
  }


  //Load the data for employees and check-Ins
  loadEmployees() {
    // This call the service to get employees from backend
    this.EmployeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data; // Save data
      // this.loadCheckIns();  // CODIGO OBSOLETO
    });
  }


  // Method to create a employee
  onSubmit() {
    if (!this.employee.id) {
      // create a employee
      this.EmployeeService.createEmployee(this.employee).subscribe(() => {
        this.loadEmployees();
        this.resetForm();
        console.log('empleado creado');

      });
    }
  }



  // Formatear Form
  resetForm() {
    this.employee = { id: null, name: '', position: '', department: '', email: '' };
  }








}
