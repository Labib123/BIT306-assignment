import { Injectable } from '@angular/core';
import{TestK} from "./testkit.model" ;
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TestKService {
  private testsK:TestK[]=[];
  //= [
    //{id: 1, name: 'Hydrogen', stock: 10},
    //{id: 2, name: 'Helium', stock: 100},
    //{id: 3, name: 'Lithium', stock: 200},
  //]
  private postsUpdated = new Subject<TestK[]>();
  constructor(private http: HttpClient, private router:Router) {
  }

  getTests(){
    this.http.get<{message: string, testsK: any}>('http://localhost:3000/api/testsK')
    .pipe(map((postData) => {
      return postData.testsK.map(testK => {
        return{
          name:testK.name,
          stock:testK.stock,
          id:testK._id
        };
      });
    }))
    .subscribe(transformedPosts =>{
      this.testsK = transformedPosts;
      this.postsUpdated.next([...this.testsK]);
    })
    return this.testsK;
  }
  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  public  getTest(id):TestK {
    let currentPost ;
      this.testsK.forEach(function(testK){
        if(testK.id === id) {
          currentPost = testK;
        }
      })
      return currentPost;
    }
  public addTest(name,stock)  {
    //let lastElementId = this.testsK[this.testsK.length-1].id;
    //let testK:TestK  = {name:name,stock:stock,id:lastElementId+1,}
    //this.testsK.push(testK);
    const testK:TestK = {id:null,name:name, stock:stock};
    this.http
    .post<{message:string}> ('http://localhost:3000/api/testsK',testK)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.testsK.push(testK);
      this.postsUpdated.next([...this.testsK]);
      this.router.navigate(['/']);
    });
  }
  public updateTest(id,name,stock){
    const testK:TestK = {id:id, name:name, stock:stock};
    this.http.put('http://localhost:3000/api/testsK/'+ id, testK)
    .subscribe(response => {
      console.log(response);
      console.log(testK);
      this.router.navigate(['/']);
    });
  }
  deleteTestK(id:String){
    this.http.delete('http://localhost:3000/api/testsK/'+id)
    .subscribe(() => {
      console.log("Test Kit Deleted!");
    });
  }


}


