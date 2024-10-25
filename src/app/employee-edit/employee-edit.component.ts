import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
  // styleUrls: ['./employee-edit.component.css']  //Verificar

})
export class EmployeeEditComponent {


  employee: any;

  

  // //Mi constructor para hacer las llamadas al service || el segundo parametro es para cerrar los formularios y funcion del boton cancel
  // constructor(private EmployeeService: EmployeeService, private dialogRef: MatDialogRef<CheckComponent>) { }






  // save(): void {
  //   // Verificar
   
  //   );
  // }


  // close(): void {
  //   this.dialogRef.close();
  // }



}
