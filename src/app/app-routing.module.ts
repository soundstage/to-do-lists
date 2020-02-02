import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { PastComponent } from './past/past.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: 'lists', component: ListsComponent },
  // { path: 'past/:tasks', component: PastComponent },
  { path: 'past', component: PastComponent },
  { path: 'newtask', component: NewTaskComponent },
  { path: 'notes/:id', component: NotesComponent },
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
