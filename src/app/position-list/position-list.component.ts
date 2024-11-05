import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PositionEditComponent } from '../position-edit/position-edit.component';





@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.css'
})
export class PositionListComponent implements OnInit {

  // Arrays to store positions and departments
  positions: any[] = [];
  departments: any[] = [];


  //  Constructor to inject service and dialog reference 
  constructor(private EmployeeService: EmployeeService, public dialog: MatDialog) { }


  ngOnInit() {
// Load departments and positions 
    this.getDepartmentsAndPositions();
  }

  // Method to load departments and positions, and associate them
  getDepartmentsAndPositions() {
    // Load departments
    this.EmployeeService.getDepartments().subscribe((departmentsData) => {
      this.departments = departmentsData;

      // Load positions and associate each with its department
      this.EmployeeService.getPositions().subscribe((positionsData) => {
        this.positions = positionsData.map(position => {

          // Find the department containing this position
          const department = this.departments.find(dep => dep.positions.some((pos: { id: any; }) => pos.id === position.id));
          // Asocciate the department name with the position
          return { ...position, departmentName: department ? department.name : 'N/A' };
        });
      });
    });
  }



   // Method to delete a position
   deletePosition(positionId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this position?");
    if (confirmDelete) {
      this.EmployeeService.deletePosition(positionId).subscribe(() => {
        this.getDepartmentsAndPositions(); // Update position list 
      });
    }
  }



  // Method to edit a position
  editPosition(position: any) {
    const dialogRef = this.dialog.open(PositionEditComponent, {
      width: '400px',
      data: { position: position } // Pass position data to the dialog
      
    });

        this.getDepartmentsAndPositions(); // Update list


    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.getDepartmentsAndPositions(); // Actualiza la lista después de editar si hubo cambios
    //   }
    // });
  }

  


}