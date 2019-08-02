import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Injectable } from '@angular/core';
import { HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { NgFlashMessagesModule } from 'ng-flash-messages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    FileSaverModule,
    NgFlashMessagesModule.forRoot()
  ],
  exports:[
  FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
