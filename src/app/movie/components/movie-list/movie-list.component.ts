import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services';
import { MovieModel } from '../../models';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

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

  pageSizes = [5, 10, 25, 100];
  pageSize = this.pageSizes[1];
  pageIndex = 0;
  totalCount: number;
  isLoading = false;

  genres: ItemChecked[] = [];
  movies: MovieModel[] = [];
  search = new FormControl('');

  selectedGenres = () => this.genres
    .filter(x => x.isChecked);

  constructor(private readonly movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getGenres()
      .subscribe(data => this.genres = data.map(x => {
        return {
          id: x.id,
          name: x.name,
          isChecked: false
        } as ItemChecked;
      }));

    this.searchData();

    this.search.setValue('')

    this.search.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      map(value => value.trim()))
      .subscribe(value => {
        if (value.length != 1) {
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

  unselectGenre(genre: ItemChecked) {
    genre.isChecked = false;
    this.searchData();
  }

  searchData() {
    const selectedGenres = this.selectedGenres()
      .map(x => x.id);

    this.isLoading = true;

    this.movieService
      .search({
        filterText: this.search.value,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        genres: selectedGenres
      })
      .subscribe(data => {
        this.movies = data.items;
        this.totalCount = data.totalCount;
        this.isLoading = false;
      });
  }
}
