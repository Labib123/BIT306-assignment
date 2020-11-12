import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecordedTestsComponent } from './Tests/recorded-tests/recorded-tests.component';
import { RecordNewTestComponent } from './Tests/record-new-test/record-new-test.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {RecordedTestkitComponent} from './Tests-kit/recorded-testkit/recorded-testkit.component';
import {RecordNewTestkitComponent} from './Tests-kit/record-new-testkit/record-new-testkit.component';
import { TestHistoryComponent } from './Tests/test-history/test-history.component';
import { GenerateTestReportComponent } from './Tests/generate-test-report/generate-test-report.component';
import {RecordedTestCentreComponent} from './Tests-centre/recorded-tc/recorded-tc.component';
import {RecordNewTestCentreComponent} from './Tests-centre/record-new-tc/record-new-tc.component';
import { SidenavComponent } from './sidenav/sidenav.component'
import {SignupComponent} from './signup/signup.component';
const routes: Routes =[
  { path: '' , component:  HomePageComponent },
  { path: 'sidenav' , component:  SidenavComponent },
  { path: 'recorded-tests' , component: RecordedTestsComponent  },
  { path: 'recorded-new-test' , component: RecordNewTestComponent },
  { path: 'recorded-test-centre' , component: RecordedTestCentreComponent },
  { path: 'recorded-new-centre' , component: RecordNewTestCentreComponent },
  { path: 'recorded-test-kit' , component: RecordedTestkitComponent },
  { path: 'recorded-new-testkit' , component: RecordNewTestkitComponent },
  { path: 'test-history' , component: TestHistoryComponent },
  { path: 'generate-test-report' , component: GenerateTestReportComponent },
  { path: 'login' , component: LoginPageComponent },
  { path: 'signup' , component: SignupComponent },






  { path: '**' , component: NotFoundComponent  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
