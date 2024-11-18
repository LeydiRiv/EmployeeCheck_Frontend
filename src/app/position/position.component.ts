import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrl: './position.component.css'
})
export class PositionComponent {


  departments: any[] = []; // Array to store departments 
  selectedDepartment: any; // Variable to hold selected department
  departmentName: string = '';
  positionName: string = '';
  selectedDepartmentId: string = '';


  
  //  Constructor to inject service and dialog reference 
  constructor(private EmployeeService: EmployeeService, private dialogRef: MatDialogRef<PositionComponent>) { }



  ngOnInit() {
    this.getDepartments(); // Load existing departments when component starts
  }

  // Method to get the list of departments
  getDepartments(){
    this.EmployeeService.getDepartments().subscribe((data)=> {
      this.departments = data; // Assign backend data to departments array
    })
  }

   // Method to close the dialog
   closeDialog() {
    this.dialogRef.close();
  }

  // Method to create a department
  createDepartment() {
    this.EmployeeService.createDepartment({ name: this.departmentName }).subscribe(() => {
      console.log("Department created successfully!");
      this.closeDialog(); // Close dialog when done
    });
  }

  // Method to handle the save button for creating either a department or a position
  save() {
    if (this.departmentName && !this.positionName) {
      // Create a new department if only the department name is provided
      this.createDepartment();
    } else if (this.selectedDepartmentId && this.positionName) {
      // Create a position if a department is selected and position name is entered 
      this.createPosition();
    } else {
      console.log("Error!");
    }
  }


  // Method to create a new position associated with a department
  createPosition() {
    const positionData = {
      name: this.positionName,
      department: {
        id: this.selectedDepartmentId // Associate position with department by its ID
      }
    };
    this.EmployeeService.createPosition(positionData).subscribe(() => {
      console.log(`Position ${this.positionName} created`);
      this.closeDialog(); // Close dialog
    });
  }




}



