import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import {MatSelectModule} from '@angular/material/select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavComponent } from './sidenav/sidenav.component'
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component'; 
import {TestService} from "./Tests/test.service";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { RecordedTestsComponent } from './Tests/recorded-tests/recorded-tests.component';
import {MatInputModule} from "@angular/material/input" ; 
import {MatDialogModule} from '@angular/material/dialog';
import { RecordNewTestComponent } from './Tests/record-new-test/record-new-test.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateTestComponent } from './Tests/update-test/update-test.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NotFoundComponent,
    HomePageComponent,
    RecordedTestsComponent,
    RecordNewTestComponent,
    UpdateTestComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    LayoutModule,
    MatSelectModule,
    NgbModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([
  { path: '' , component:  HomePageComponent },
  { path: 'recorded-tests' , component: RecordedTestsComponent  },
  { path: 'recorded-new-test' , component: RecordNewTestComponent },

  
  { path: '**' , component: NotFoundComponent  },

    ]),
    MatTableModule,
    MatSortModule

  ],
  providers: [TestService],
  bootstrap: [AppComponent],
  entryComponents:[RecordNewTestComponent]
})
export class AppModule { }
