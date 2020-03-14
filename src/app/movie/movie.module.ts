import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsComponent, MovieListComponent, MovieLayoutComponent } from './components';
import { MovieRoutingModule } from './movie-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MovieFilterPopupComponent } from './components/movie-filter-popup/movie-filter-popup.component';

@NgModule({
  declarations: [MovieDetailsComponent, MovieListComponent, MovieLayoutComponent, MovieFilterPopupComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule
  ]
})
export class MovieModule { }
