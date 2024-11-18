import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Endpoints for API access
  private employeeApiUrl = 'http://localhost:8762/employeesystem/api/v1/people';
  private checkApiUrl = 'http://localhost:8762/checkinsystem/api/v1/checkins';
  private departmentUrl = 'http://localhost:8762/departmentrolesystem/api/v1/departments';
  private positionUrl = 'http://localhost:8762/departmentrolesystem/api/v1/positions';


  // Constructor to inject HttpClient for Http requests
  constructor(private http: HttpClient) { }


  //Employee

  // Register a new employee
  createEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.employeeApiUrl}/register`, employee);
  }

  // Get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.employeeApiUrl);
  }


    // Update an employee
    updateEmployee(employeeId: string, employee: any): Observable<any> {
      return this.http.put<any>(`${this.employeeApiUrl}/employees/${employeeId}`, employee);
    }
  


  // Delete an employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.employeeApiUrl}/${id}`);
  }


  // Check

  // Get all the checkIns
  getCheckIns(): Observable<any[]> {
    return this.http.get<any[]>(this.checkApiUrl); 
  }


  // Create Check-In in CheckInSystem
  createCheckIn(employeeId: number): Observable<any> {
    return this.http.post<any>(`${this.checkApiUrl}/${employeeId}`, null);
  }

  //Put Check-Out in CheckInSystem
  checkoutFromCheckInSystem(checkInId: number): Observable<any> {
    return this.http.put<any>(`${this.checkApiUrl}/checkout/${checkInId}`, null);
  }


  // Delete a check-in in CheckInSystem
  deleteCheckIn(checkInId: number): Observable<any> {
    return this.http.delete(`${this.checkApiUrl}/${checkInId}`);
  }

// Departments

  //Get departments
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.departmentUrl);
  }

// Create a new department
  createDepartment(department: any): Observable<any> {
    return this.http.post<any>(`${this.departmentUrl}/register`, department);
  }

  // Update a department
  updateDepartment(departmentId: string, department: any): Observable<any> {
    return this.http.put<any>(`${this.departmentUrl}/register/${departmentId}`, department);
  }

  // Delete a department
  deleteDepartment(departmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.departmentUrl}/${departmentId}`);
  }

// Positio

  // Create a new position
  createPosition(position: any): Observable<any> {
    return this.http.post(`${this.positionUrl}/register`, position); 
  }

  // Get all the positions
  getPositions(): Observable<any[]> {
    return this.http.get<any[]>(this.positionUrl);
  }

  // Delete a position
  deletePosition(positionId: string): Observable<any> {
    return this.http.delete<any>(`${this.positionUrl}/${positionId}`);
  }


  // Update a position
  updatePosition(positionId: string, position: any): Observable<any> {
    return this.http.put<any>(`${this.positionUrl}/register/${positionId}`, position);
  }



// Method to get position by department
getPositionsByDepartment(departmentId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.positionUrl}/department/${departmentId}`);
}




// Obtenemos la paginación - verficiar. Al parecer el backend esta bien
getPaginatedEmployees(page: number, size: number): Observable<any> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get<any>(`${this.employeeApiUrl}/pagination`, { params });
}


// getPaginatedEmployees(params: any): Observable<any> {
//   return this.http.get<any>(this.employeeApiUrl, { params });
// }

// getPaginatedEmployees(params: any): Observable<any> {
//   return this.http.get<any>(`${this.employeeApiUrl}/employees`, { params });
// }





}
