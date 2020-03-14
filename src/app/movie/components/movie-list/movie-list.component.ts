import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services';
import { MovieModel, MovieSearchFilterModel, ItemChecked } from '../../models';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelProperties } from 'src/app/shared/utilities';
import { MatDialog } from '@angular/material/dialog';
import { MovieFilterPopupComponent } from '../movie-filter-popup/movie-filter-popup.component';


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
  selectedGenres = () => this.genres.filter(x => x.isChecked);
  movies: MovieModel[] = [];
  search = new FormControl('');

  filters = ModelProperties.propertiesOf<MovieSearchFilterModel>();

  constructor(
    private readonly movieService: MovieService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
  }

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

  openFilters() {
    const dialogRef = this.dialog.open(MovieFilterPopupComponent, {
      maxWidth: '500px',
      data: this.genres
    });

    dialogRef.afterClosed().subscribe(() => {
      this.searchData();
    });
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
