import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';


@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrl: './check-list.component.css'
})
export class CheckListComponent implements OnInit {

  employees: any[] = [];
  checkIns: any[] = [];
  // Aqui implementaremos la logica para mostrar los datos de check

  empleadoAnterior: string = 'Unknown Employee';


  //Este es el servidor en donde traemos los datos de backend
  constructor(private EmployeeService: EmployeeService) { }

  ngOnInit() {
    this.loadChecks();
  }

  //Load the data for employees and check-Ins - Aqui basicamente traemos la informacon
  
  loadChecks() {
    // This call the service to get employees from backend
    this.EmployeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data; // Save data
      console.log('Empleados cargados:', this.employees); //verificar que si este funcionando los datos
      this.loadCheckIns(); //
    });
  }

  
getEmployeeName(checkId: number): string {
  // Busca el empleado que tiene el check-in actual en su lista de checkIns
  const employee = this.employees.find(emp => emp.checkIns.some((ci: { id: number; }) => ci.id === checkId));
  
  if (employee) {
    this.empleadoAnterior = employee.name; // Actualizamos el ultimo name
    return employee.name;
  } else {
    return this.empleadoAnterior; // Devolvemos el ultimo name
  }
}



  // Get the checkIns list
  loadCheckIns() {
    this.EmployeeService.getCheckIns().subscribe((data: any[]) => {
      console.log('Check-ins:', data);  // Verificar los datos de checkIN
      this.checkIns = data; // Assign the data received from the backend to checkIns
    });
  }



  deleteCheckIn(id: number) {
    this.EmployeeService.deleteCheckIn(id).subscribe(() => {
      this.loadCheckIns(); //refresh list
    }, error => {
      console.error('No se logro elimninar registro ', error);
    });
  }




}
