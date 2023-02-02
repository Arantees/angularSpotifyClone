import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { AppRotas } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRotas),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
