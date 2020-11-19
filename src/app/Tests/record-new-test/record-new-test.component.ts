import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { MatDialogRef} from '@angular/material/dialog';
import {RecordedTestsComponent} from '../recorded-tests/recorded-tests.component'
import {Test} from "../test.model"
import {TestService} from '../test.service' ;
import {AuthService} from '../../../app/auth.service';

@Component({
  selector: 'app-record-new-test',
  templateUrl: './record-new-test.component.html',
  styleUrls: ['./record-new-test.component.css']
})
export class RecordNewTestComponent implements OnInit {
  selectedType ="" ;

  constructor(public authService:AuthService,private dialogRef:MatDialogRef<RecordedTestsComponent>,private testService: TestService) { }

  public onAddTest(form:NgForm){
    if(form.invalid){
      return;
    }

    this.authService.createUser(form.value.name,form.value.email, form.value.password, "Patient");
    this.testService.addTest(this.authService.email,new Date(),"pending",form.value.email,form.value.type,form.value.symptoms, )
    this.dialogRef.close();

  }
  ngOnInit(): void {
  }
  onCancel() { 
    this.dialogRef.close();
  }

}
