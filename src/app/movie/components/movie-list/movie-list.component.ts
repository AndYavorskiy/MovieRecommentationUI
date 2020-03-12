import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services';
import { MovieModel, MovieSearchFilterModel } from '../../models';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelProperties } from 'src/app/shared/utilities';

export interface ItemChecked {
  id: number;
  name: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  pageSizes = [10, 15, 25, 100];
  pageSize = this.pageSizes[1];
  pageIndex = 0;
  totalCount: number;
  isLoading = false;

  genres: ItemChecked[] = [];
  movies: MovieModel[] = [];
  search = new FormControl('');

  selectedGenres = () => this.genres.filter(x => x.isChecked);
  filters = ModelProperties.propertiesOf<MovieSearchFilterModel>();

  constructor(
    private readonly movieService: MovieService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.
      pipe(take(1))
      .subscribe(param => {
        this.search.setValue(param[this.filters('filterText')] || this.search.value);
        this.pageIndex = param[this.filters('pageIndex')] || this.pageIndex;
        this.pageSize = param[this.filters('pageSize')] || this.pageSize;

        const genresFromQuery = param[this.filters('genres')];

        const g = Array.isArray(genresFromQuery)
          ? genresFromQuery
          : genresFromQuery
            ? [genresFromQuery]
            : []

        const genresIds = (g).map(x => +x);

        this.movieService.getGenres()
          .subscribe(data => {
            this.genres = data.map(x => {
              return {
                id: x.id,
                name: x.name,
                isChecked: genresIds.some(g => g == x.id)
              }
            });

            this.searchData();
          });

        this.search.valueChanges.pipe(
          debounceTime(800),
          distinctUntilChanged(),
          map(value => value.trim()))
          .subscribe(value => {
            if (value.length != 1) {
              this.pageIndex = 0;
              this.searchData();
            }
          });
      });
  }

  onPaginatorChanges(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.searchData();
  }

  unselectGenre(genre: ItemChecked) {
    genre.isChecked = false;
    this.searchData();
  }

  searchData() {
    const fiter = {
      filterText: this.search.value,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      genres: this.selectedGenres().map(x => x.id)
    } as MovieSearchFilterModel;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: fiter
      });

    this.isLoading = true;

    this.movieService
      .search(fiter)
      .subscribe(data => {
        this.movies = data.items;
        this.totalCount = data.totalCount;
        this.isLoading = false;
      });
  }
}
