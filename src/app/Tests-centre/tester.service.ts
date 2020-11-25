import { Injectable } from '@angular/core';
import{Tester} from "./tester.model" ;
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TesterService {
  private tester:Tester[] = [];
    //{id: 1, name: 'Will', username: 'will', password:'will',position:'Tester', testC:'Damansara'},
    //{id: 1, name: 'Dan', username: 'Dan', password:'Dan',position:'Tester', testC:'Puchong'},
    //{id: 1, name: 'Tan', username: 'Tan', password:'Tan',position:'Tester', testC:'Sunway'},
  //]
  constructor(private http: HttpClient, private router:Router) {
  }
  usertype:string;

  private postsUpdated = new Subject<Tester[]>();
  public  getTesters(){
    this.http.get<{message: string, tester: any}>('http://localhost:3000/api/tester')
      .pipe(map((postData) => {
        return postData.tester.map(tester => {
          return{
            name:tester.name,
            id:tester._id,
            position:tester.position,
            testCentre:tester.testCentre,
            email:tester.email
          };
        });
      }))
      .subscribe(transformedPosts =>{
        this.tester = transformedPosts;
        this.postsUpdated.next([...this.tester]);
      })
      return this.tester;
    }
    getPostUpdateListener(){
      return this.postsUpdated.asObservable();
    }
    public  getTester(id):Tester {
      let currentPost ;
        this.tester.forEach(function(testC){
          if(testC.id === id) {
            currentPost = testC;
          }
        })
        return currentPost;
    }
    findtester(){
      return this.http.get<{message: string, tester: any}>('http://localhost:3000/api/tester');
    }
  public addTester(name,email,password,position,testCentre)  {
    const tester:Tester = {id:null,name:name,email:email, password:password, position:position, testCentre:testCentre};
    this.http.post('http://localhost:3000/api/tester/signup', tester)
      .subscribe(response =>{
        console.log(response);
      });
      this.router.navigate(['/']);
  }
  deleteTester(id:String){
    this.http.delete('http://localhost:3000/api/tester/'+id)
    .subscribe(() => {
      console.log("Tester Deleted!");
    });
    //this.router.navigate(['/']);
  }


}


