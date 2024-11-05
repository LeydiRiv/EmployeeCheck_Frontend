import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styleUrl: './position-edit.component.css'
})
export class PositionEditComponent implements OnInit{


  PositionForm: FormGroup; // Define the Position form

  constructor(private EmployeeService: EmployeeService, // Service
     private dialogRef: MatDialogRef<PositionEditComponent>,
    private fb: FormBuilder, // Create reactive form
    @Inject(MAT_DIALOG_DATA) public data: any //Data injected into the dialog
  ) { 
    this.PositionForm = this.fb.group({ // Initialize the form with the position
      name: [data?.position?.name || '']
      
    });
    console.log('Data saved');
}

ngOnInit(): void {}

// Method to save changes
  save(): void {
    console.log("Save button clicked");
    const updatedPosition = { ...this.data.position, ...this.PositionForm.value }; // Combine current data with form data
    this.EmployeeService.updatePosition(updatedPosition.id, updatedPosition).subscribe(() => {
      this.dialogRef.close(updatedPosition); // Save
    });
    console.log('Data saved successfully!');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  

}
