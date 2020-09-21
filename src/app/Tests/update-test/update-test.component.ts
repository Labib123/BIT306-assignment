
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Test} from "../test.model"; 
import {TestService} from "../test.service"; 
import {NgForm} from '@angular/forms'

import { Inject } from '@angular/core';  
@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {
  id ; 
  currentTest:Test; 
 
  testResult; 
  selectedType;
  constructor(   private dialogRef: MatDialogRef<Test>,  @Inject(MAT_DIALOG_DATA) data,private testService: TestService ) {
    this.id = data.id;
    this.currentTest= this.testService.getTest(this.id); 
    

}
    

  
onCancel(){
  this.dialogRef.close()
}
    
  
onUpdateTest(form:NgForm){
  if(form.invalid){
    return;
  }
  this.testService.updateTest(this.currentTest.id, this.currentTest.username,this.currentTest.password,this.currentTest.name,this.selectedType,this.currentTest.symptoms,this.testResult)
   this.dialogRef.close();
}

  
 
  ngOnInit(): void {
  }

}
