import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //Endpoints
  private employeeApiUrl = 'http://localhost:8762/employeesystem/api/v1/people';
  private checkApiUrl = 'http://localhost:8762/checkinsystem/api/v1/checkins';


  //para las peticiones http
  constructor(private http: HttpClient) { }


  //cosas de Employee:

  // Registrar empleado
  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.employeeApiUrl}/register`, employee);
  }

  // Obtener empleados
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.employeeApiUrl);
  }

  // // Actualizar empleado
  // updateEmployee(employee: any): Observable<any> {
  //   return this.http.patch(`${this.employeeApiUrl}/employees/${employee.id}`, employee);
  // }

//VERIFICAR
  updateEmployee(employee: any): Observable<any> {
    return this.http.patch(`${this.employeeApiUrl}/employees/${employee.id}`, employee, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  



  // Eliminar empleado
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.employeeApiUrl}/${id}`);
  }







  //Cosas de Check

   //Get checkInSystem - Get all the checkIns
  getCheckIns(): Observable<any[]> {
    return this.http.get<any[]>(this.checkApiUrl); //Hace referencia al check-In
  }


    // Create Check-In in CheckInSystem
  createCheckIn(employeeId: number): Observable<any> {
    return this.http.post<any>(`${this.checkApiUrl}/${employeeId}`, null);
  }

//Put Check-Out in CheckInSystem
  checkoutFromCheckInSystem(checkInId: number): Observable<any> {
    return this.http.put<any>(`${this.checkApiUrl}/checkout/${checkInId}`, null);
  }


// 



  // Delete a check-in in CheckInSystem
  deleteCheckIn(checkInId: number): Observable<any> {
    return this.http.delete(`${this.checkApiUrl}/${checkInId}`);
  }

}
