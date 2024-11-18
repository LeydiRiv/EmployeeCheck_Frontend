import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrl: './department-edit.component.css'
})
export class DepartmentEditComponent implements OnInit {


  departmentForm: FormGroup; // Define the department form

 
  constructor(private EmployeeService: EmployeeService,  // Service
    private dialogRef: MatDialogRef<DepartmentEditComponent>, // Reference to close the dialog
    private fb: FormBuilder, // Create reactive form
    @Inject(MAT_DIALOG_DATA) public data: any) // Data injected into the dialog
     {
    this.departmentForm = this.fb.group({ // Initialize the form with the department name
      name: [data?.department?.name || '']

    });
    console.log("Data saved");
  }

  ngOnInit(): void { }


  // Method to save changes
  save(): void {
    console.log("Save button clicked");
    const updatedDepartment = { ...this.data.department, ...this.departmentForm.value }; // Combine current data with form data
    this.EmployeeService.updateDepartment(updatedDepartment.id, updatedDepartment).subscribe(() => {
      this.dialogRef.close(updatedDepartment); //save
    });
    console.log("Data saved successfully!");
  }

  cancel(): void {
    this.dialogRef.close();
  }


}
