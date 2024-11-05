// import { Component, Inject } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { EmployeeService } from '../services/api.service';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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




  // // Arrays to store departments, positions, and filtered positions
  // departments: any[] = [];
  // positions: any[] = [];
  // filteredPositions: any[] = [];




  constructor(private EmployeeService: EmployeeService, // Service
    private dialogRef: MatDialogRef<EmployeeEditComponent>,
    private fb: FormBuilder, // Create reactive form
    @Inject(MAT_DIALOG_DATA) public data: any // Data injected into the dialog
  ) {
    this.EmployeeForm = this.fb.group({ // Initialize the form with the employee 
      name: [data?.employee?.name || ''],
      position: [data?.employee?.position || ''],
      email: [data?.employee?.email || ''],
      department: [data?.employee?.department || '']

    });


    console.log("Data saved");
  }

  ngOnInit(): void {
    // this.loadDepartments(); // Load departments
    // this.loadPositions(); // Load departments
  }

  // employee = { 
  //   position: { id: null, name: '' }, 
  //   department: { id: null, name: '' }, 
  // };



  // // Method to load departments from the backend
  // loadDepartments() {
  //   this.EmployeeService.getDepartments().subscribe((data: any[]) => {
  //     this.departments = data;
  //   });
  // }

  // // Method to load positions from the backend 
  // loadPositions() {
  //   this.EmployeeService.getPositions().subscribe((data: any[]) => {
  //     this.positions = data;
  //     console.log('Loading positions:', this.positions);
  //   });
  // }

  // // Method to filter positions based on selected department
  // filterPositionsByDepartment() {
  //   const departmentId = this.employee.department?.id;
  //   if (departmentId) {
  //     this.EmployeeService.getPositionsByDepartment(departmentId).subscribe((positions) => {
  //       this.filteredPositions = positions; // Assign filtered positions 
  //       console.log('Filtered Positions:', this.filteredPositions);
  //     });
  //   }
  // }


  // Method to save changes
  save(): void {
    console.log("Save button clicked");
    const updatedEmployee = { ...this.data.employee, ...this.EmployeeForm.value }; // Combine current data with form data
    this.EmployeeService.updateEmployee(updatedEmployee.id, updatedEmployee).subscribe(() => {
      this.dialogRef.close(updatedEmployee); // save
    });
    console.log("Data saved successfully!");
  }


  cancel(): void {
    this.dialogRef.close();
  }

}
