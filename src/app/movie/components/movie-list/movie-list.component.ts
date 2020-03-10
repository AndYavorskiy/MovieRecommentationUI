import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services';
import { MovieModel } from '../../models';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  pageIndex = 0;
  totalCount = 100;
  pageSize = this.pageSizes[1];

  genres: ItemChecked[] = [];
  movies: MovieModel[] = [];
  search = new FormControl('');

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

  onCheckboxChange() {
    this.searchData();
  }

  private searchData() {
    const selectedGenres = this.genres
    .filter(x => x.isChecked)
    .map(x => x.id);
console.log(selectedGenres);

    this.movieService
      .search(this.search.value, this.pageIndex, this.pageSize, selectedGenres)
      .subscribe(data => {
        this.movies = data.items;
        this.totalCount = data.totalCount;
      });
  }

}
