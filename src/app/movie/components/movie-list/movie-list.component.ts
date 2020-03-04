import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services';
import { MovieModel } from '../../models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  private pageIndex = 0;
  private pageSize = 20;

  public movies: MovieModel[] = [];

  constructor(private readonly movieService: MovieService) { }

  ngOnInit() {
    this.movieService
      .search(this.pageIndex, this.pageSize)
      .subscribe(data => this.movies = data);
  }
}
