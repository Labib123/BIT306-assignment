
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
  public testsArray; 
  public patientName;
  public symptoms; 
  currentTest = null;
  isReturnee = false; 
  iscloseContact = false ; 
  isQuarantined = false ; 
  isSuspected = false ; 
  isInfected = false ; 
  testResult;
  selectedType = "quarantined";

  constructor(   private dialogRef: MatDialogRef<Test>,  @Inject(MAT_DIALOG_DATA) data,private testService: TestService ) {
    this.id = data.id;
    this.onInitialize() ; 
    
    
   

    }


    onInitialize(){
      this.testService.getAllTests().subscribe((response: any) => {
    
        this.testsArray = response.tests; 
        this.testsArray.forEach( (element) => {
          if(element._id == this.id){
            this.currentTest = element;
            this.selectedType = element.patientType; 
            this.patientName = element.name; 
            this.symptoms = element.symptoms
          }
      });
      
    
      }); ;
    }

onCancel(){
  this.dialogRef.close()
}


onUpdateTest(form:NgForm){
  if(form.invalid){
    return;
  }
  this.testService.updateTest(this.currentTest._id, this.currentTest.userId,this.patientName,this.selectedType,this.symptoms,this.testResult)
   this.dialogRef.close();
}



  ngOnInit(): void {
    if(this.currentTest.patientType === "returnee") this.selectedType = "returnee"; 
    else if(this.currentTest.patientType === "close-contact")  this.selectedType = "close-contact"; 
    else if(this.currentTest.patientType === "quarantined")  this.selectedType = "quarantined"; 
    else if(this.currentTest.patientType === "suspected")  this.selectedType = "suspected"; 
    else if(this.currentTest.patientType === "infected")  this.selectedType = "infected";  
  }

}
