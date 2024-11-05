import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';




@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {



// Arrays to store departments, positions, and filtered positions
  departments: any[] = [];
  positions: any[] = [];
  filteredPositions: any[] = [];

  // employee = { id: null, name: '', position: null, department: { id: null }, email: '' };

  employee = { 
    id: null, 
    name: '', 
    position: { id: null, name: '' }, 
    department: { id: null, name: '' }, 
    email: '' 
  };
  
// Constructor to inject EmployeeService and dialog reference
  constructor(private employeeService: EmployeeService, private dialogRef: MatDialogRef<EmployeeComponent>) {}

  ngOnInit(): void {
    this.loadDepartments(); // Load departments
    this.loadPositions(); // Load departments
  }

   // Method to load departments from the backend
  loadDepartments() {
    this.employeeService.getDepartments().subscribe((data: any[]) => {
      this.departments = data;
    });
  }

   // Method to load positions from the backend 
  loadPositions() {
    this.employeeService.getPositions().subscribe((data: any[]) => {
      this.positions = data;
      console.log('Loading positions:', this.positions);
    });
  }
  // Method to filter positions based on selected department
  filterPositionsByDepartment() {
    const departmentId = this.employee.department?.id;
    if (departmentId) {
      this.employeeService.getPositionsByDepartment(departmentId).subscribe((positions) => {
        this.filteredPositions = positions; // Assign filtered positions 
        console.log('Filtered Positions:', this.filteredPositions);
      });
    }
  }




  // Method to handle form submission
  onSubmit() {
    if (!this.employee.id) {
// Store selected department and position names in string variables
      const departmentEnviar = this.employee.department?.name || ''; // Save only department name
      const positionEnviar = this.employee.position?.name || ''; // 
  
      // Create newEmployee object with text variables
      const newEmployee = {
        name: this.employee.name,
        email: this.employee.email,
        department: departmentEnviar, // Send department name as string
        position: positionEnviar      // same
      };
  
      // console.log('Employee data to register: ', newEmployee); 
      this.employeeService.createEmployee(newEmployee).subscribe(
        () => {
          // this.resetForm();
          console.log('Employee created');
        },
        (error) => {
          console.error('Error creating employee!', error);
        }
      );
    }
  }
  




  closeDialog() {
    this.dialogRef.close();
  }




}




