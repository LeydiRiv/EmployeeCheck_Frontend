import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {

  // Define the employee form
  EmployeeForm: FormGroup;

  // Arrays to store departments, positions, and filtered positions
  departments: any[] = [];
  positions: any[] = [];
  filteredPositions: any[] = [];


  constructor(private EmployeeService: EmployeeService, // Service
    private dialogRef: MatDialogRef<EmployeeEditComponent>,
    private fb: FormBuilder, // Create reactive form
    @Inject(MAT_DIALOG_DATA) public data: any // Data injected into the dialog
  ) {
    this.EmployeeForm = this.fb.group({ // Initialize the form with the employee 
      name: [data?.employee?.name || ''],
      department: [data?.employee?.department || null],
      email: [data?.employee?.email || ''],
      position: [data?.employee?.position || null]

    });


    console.log("Data saved");
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPositions();

    // If the employee already has a department, filter positions by that department
    if (this.data.employee?.department) {
      this.filterPositionsByDepartment();
    }

  }

  // Method to load departments from the backend 
  loadDepartments() {
    this.EmployeeService.getDepartments().subscribe((data: any[]) => {
      this.departments = data;
    });
  }

  // Method to load positions from the backend 
  loadPositions() {
    this.EmployeeService.getPositions().subscribe((data: any[]) => {
      this.positions = data;
    });
  }

  // Method to filter positions based on the selected deparment 
  filterPositionsByDepartment() {
    const departmentId = this.EmployeeForm.get('department')?.value?.id; // Get the department Id from the form
    if (departmentId) {
      this.EmployeeService.getPositionsByDepartment(departmentId).subscribe((positions) => {
        this.filteredPositions = positions;
      });
    } else {
      this.filteredPositions = this.positions;
    }
  }


  // Method to save changes to the employee
  save(): void {
    if (this.EmployeeForm.valid) {
      // Merge the existing employee data with updated form values
      const updatedEmployee = {
        ...this.data.employee,
        ...this.EmployeeForm.value,
        department: this.EmployeeForm.value.department?.name,
        position: this.EmployeeForm.value.position?.name
      };

      this.EmployeeService.updateEmployee(updatedEmployee.id, updatedEmployee).subscribe(() => {
        this.dialogRef.close(updatedEmployee);

      });
    }

  }



  cancel(): void {
    this.dialogRef.close();
  }

}
