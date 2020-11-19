import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  userIsAuthenticated = false;
  userType:string ; 
  isOfficer:boolean; 
  isManager:boolean;
  isTester:boolean;
  isPatient:boolean; 

 
  private authListernerSubs: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private authService:AuthService,private breakpointObserver: BreakpointObserver) {}
  ngOnInit(){
    this.authListernerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
      console.log(this.authService.userType);
      this.userType = this.authService.userType;
      this.isOfficer = this.authService.userType.toUpperCase() === "officer".toUpperCase() ;  
      this.isManager = this.authService.userType.toUpperCase() === "manager".toUpperCase() ;      
      this.isTester = this.authService.userType.toUpperCase() === "tester".toUpperCase() ;      
      this.isPatient = this.authService.userType.toUpperCase() === "patient".toUpperCase() ;      
    
      console.log(this.userType)
    })
  }
  onLogout(){
    this.authService.logout();
  }
}
