import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SalesProjectListComponent } from './sales-project-list/sales-project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesProjectListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
