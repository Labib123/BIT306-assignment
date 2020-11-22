import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TestC} from "../tc.model";
import {TestCService} from "../tc.service";
import {TesterService} from "../tester.service";
import {Tester} from "../tester.model";
import {NgForm} from '@angular/forms';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-add-tester',
  templateUrl: './add-tester.component.html',
  styleUrls: ['./add-tester.component.css']
})
export class AddTesterComponent implements OnInit {


  id ;
  currentTest:TestC;

  testResult;
  selectedType;
  constructor( private dialogRef: MatDialogRef<TestC>,  @Inject(MAT_DIALOG_DATA) data,private testCService: TestCService,private testerService: TesterService ) {
    this.id = data.id;
    this.currentTest= this.testCService.getTest(this.id);
}

onCancel(){
  this.dialogRef.close()
}

public onAddTester(form:NgForm){
  if(form.invalid){
    return;
  }
    this.testerService.addTester(form.value.name,form.value.email,form.value.password,form.value.position,form.value.testCentre);
    console.log(form.value);
    this.dialogRef.close();

    // this.postService.addPosts(form.value.title , form.value.content)

}

  ngOnInit(): void {
  }

}
