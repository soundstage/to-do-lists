import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { PastComponent } from './past/past.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OcticonDirective } from './directives/octicon.directive';
import { SortHeader } from './directives/sort-header.directive';

console.log(`jQuery version: ${$.fn.jquery}`);

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    PastComponent,
    PageNotFoundComponent,
    OcticonDirective,
    SortHeader
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
