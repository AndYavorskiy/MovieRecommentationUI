import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieLayoutComponent, MovieListComponent, MovieDetailsComponent } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: MovieLayoutComponent,
    children: [
      { path: '', component: MovieListComponent },
      { path: ':id', component: MovieDetailsComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
