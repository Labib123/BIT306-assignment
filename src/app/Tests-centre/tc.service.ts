import { Injectable } from '@angular/core';
import{TestC} from "./tc.model" ;
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestCService {
  private testsC:TestC[] = [];
    //{id: 1, name: 'Damansara'},
    //{id: 2, name: 'Puchong'},
    //{id: 3, name: 'Sunway'},
  //]
  private postsUpdated = new Subject<TestC[]>();
  constructor(private http: HttpClient, private router:Router) {
  }

  //public  getTests():TestC[] {
    //return this.testsC;
    //}
    getTests(){
      this.http.get<{message: string, testsC: any}>('http://localhost:3000/api/testsC')
      .pipe(map((postData) => {
        return postData.testsC.map(testC => {
          return{
            name:testC.name,
            id:testC._id
          };
        });
      }))
      .subscribe(transformedPosts =>{
        this.testsC = transformedPosts;
        this.postsUpdated.next([...this.testsC]);
      })
      return this.testsC;
    }

    public  getTest(id){
      this.getTests();
      let currentPost;
        this.testsC.forEach(function(testC){
          if(testC.id === id) {
            currentPost = testC;
          }
        })
        return currentPost;
    }
  public addTest(name)  {
    const testC:TestC = {id:null,name:name};
    this.http
    .post<{message:string}> ('http://localhost:3000/api/testsC',testC)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.testsC.push(testC);
      this.postsUpdated.next([...this.testsC]);
      this.router.navigate(['/']);
    });
  }
  public updateTest(id,name){
    const testC:TestC = {id:id,name:name};
    this.http.put('http://localhost:3000/api/testsC/'+ id, testC)
    .subscribe(response => {
      console.log(response);
      console.log(testC);
      this.router.navigate(['/']);
    });
  }

  deleteTestC(id:String){
    this.http.delete('http://localhost:3000/api/testsC/'+id)
    .subscribe(() => {
      console.log("Test Centre Deleted!");
    });
    this.router.navigate(['/']);
  }


}


