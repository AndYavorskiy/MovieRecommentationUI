import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsComponent, MovieListComponent, MovieLayoutComponent } from './components';
import { MovieRoutingModule } from './movie-routing.module';

@NgModule({
  declarations: [MovieDetailsComponent, MovieListComponent, MovieLayoutComponent],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
