import { Injectable } from '@angular/core';
import{Test} from "./test.model" ;
import { HttpClientModule }  from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router'
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests:Test[] = [] ;
  private postsUpdated = new Subject<Test[]>();
  constructor(private http: HttpClient,private router:Router,public authService:AuthService) {

  }
  private BACKEND_URL = "http://localhost:3000/api"
  private jsonObject = {};

  public  getTests(id) {
        let url = 'http://localhost:3000/api/tester/tests?testerId='+ id ; 
        console.log(url);
        this.http.get<{message: string, tests: any}>(url )
    .pipe(map((postData) => {
      return postData.tests.map(tests => { //return http 
        return{
          name:tests.name,
          username:tests.testerId,
          symptoms:tests.symptoms,
          userId:tests.userId,
          date:tests.date,
          id:tests._id,
          patientType:tests.patientType,
          status:tests.status
        };
      });
    }))
    .subscribe(transformedPosts =>{
      this.tests = transformedPosts;
      this.postsUpdated.next([...this.tests]);
    })
    return this.tests;
  }

  

  

  public addTest(name,testerId,date,status,userId,patientType,symptoms)  {
    const testData = {name:name,testerId,symptoms:symptoms, date:date, status:status,userId:userId,patientType:patientType};
    console.log(testData)
    this.http.post('http://localhost:3000/api/tests/add', testData)
    .subscribe(response =>{
      console.log(response);
    });
  }

  public updateTest(id,username,name,patientType,symptoms,result){
       const test = {
         id:id,
         userId :username,
        name :name ,
        patientType : patientType,
        symptoms: symptoms ,
        status:'completed',
        result : result,
        date :new Date()
      }
      console.log(test);

     this.http.put('http://localhost:3000/api/tests/update/'+ id, test).subscribe(response => {
        console.log(response);
        //console.log(test);
        //this.router.navigate(['/']);
      });
  }


  public getPatientTest(id){
    return  this.http.get("http://localhost:3000/api/patient/test?id="+id  )
  
  }


  findTests(id){
    return this.http.get("http://localhost:3000/api/tester/tests?testerId=" + id ); 
}

public  getSingleTest(id){
   return this.http.get("http://localhost:3000/api/tests/findOne?=" + id )

  }

  public  getAllTests() {
    return this.http.get("http://localhost:3000/api/tests")
}

}


