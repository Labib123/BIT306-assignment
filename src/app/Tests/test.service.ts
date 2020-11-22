import { Injectable } from '@angular/core';
import{Test} from "./test.model" ;
import { HttpClientModule }  from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests:Test[] = [] ;

  constructor(private http: HttpClient,private router:Router,public authService:AuthService) {
  }
  private BACKEND_URL = "http://localhost:3000/api"
  private jsonObject = {};

  public  getTests() {

       this.http.get<[]>("http://localhost:3000/api/tester/tests").subscribe(
        response => {
        this.tests =  response;

        },
        error => {
          console.log(error);
        });

  }


  public addTest(testerId,date,status,userId,patientType,symptoms)  {
    const testData = {testerId,symptoms:symptoms, date:date, status:status,userId:userId,patientType:patientType};
    console.log(testData)
    this.http.post('http://localhost:3000/api/tests/add', testData)
    .subscribe(response =>{
      console.log(response);
    });
  }
  public updateTest(id,username,password,name,patientType,symptoms,result){
    this.tests.forEach(function(test){
      if(test.id === id) {
        test.username = username;
        test.password = password;
        test.name = name ;
        test.patientType = patientType;
        test.symptoms = symptoms ;
        test.status = 'complete' ;
        test.result = result;
        test.resultDate = new Date() ;
      }
    })
  }


}


