import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services';
import { MovieModel } from '../../models';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  pageSizes = [5, 10, 25, 100];
  pageIndex = 0;
  totalCount = 100;
  pageSize = this.pageSizes[1];

  movies: MovieModel[] = [];
  search = new FormControl('');

  constructor(private readonly movieService: MovieService) { }

  searchData() {
    this.movieService
      .search(this.search.value, this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.movies = data.items;
        this.totalCount = data.totalCount;
      });
  }

  ngOnInit() {
    this.searchData();

    this.search.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged())
      .subscribe((value: string) => {
        if (value.trim().length != 1) {
          this.pageIndex = 0;
          this.searchData();
        }
      })
  }

  onPaginatorChanges(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.searchData();
  }
}
