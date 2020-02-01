import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { PastComponent } from './past/past.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OcticonDirective } from './directives/octicon.directive';
import { SortHeader } from './directives/sort-header.directive';
import { TableFilterPipe } from './pipes/table-filter.pipe';
import { NewTaskComponent } from './new-task/new-task.component';

console.log(`jQuery version: ${$.fn.jquery}`);

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    PastComponent,
    PageNotFoundComponent,
    OcticonDirective,
    SortHeader,
    TableFilterPipe,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
