import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { MatDialogRef} from '@angular/material/dialog';
import {RecordedTestsComponent} from '../recorded-tests/recorded-tests.component'
import {Test} from "../test.model"
import {TestService} from '../test.service' ;
@Component({
  selector: 'app-record-new-test',
  templateUrl: './record-new-test.component.html',
  styleUrls: ['./record-new-test.component.css']
})
export class RecordNewTestComponent implements OnInit {
  selectedType ="" ;

  constructor(private dialogRef:MatDialogRef<RecordedTestsComponent>,private testService: TestService) { }

  public onAddTest(form:NgForm){
    if(form.invalid){
      return;
    }
      this.testService.addTest(form.value.username,form.value.password,form.value.name, this.selectedType,form.value.symptoms)
      console.log(form.value.username,form.value.password,form.value.name, this.selectedType,form.value.symptoms)
    this.dialogRef.close();
     
      // this.postService.addPosts(form.value.title , form.value.content)
   
  }
  ngOnInit(): void {
  }
  onCancel() { 
    this.dialogRef.close();
  }

}
