import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HttpParamsBuilder } from 'src/app/shared/utilities';
import { MovieModel } from '../models';
import { ListData, GenreModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseUrl = `${environment.baseApiUrl}/api/movie`;

  constructor(private http: HttpClient) { }

  public search(filter: string, pageIndex: number, pageSize: number, genres: number[]) {
    return this.http.post<ListData<MovieModel>>(`${this.baseUrl}`, {
      filterText: filter,
      pageIndex: pageIndex,
      pageSize: pageSize,
      genres: genres
    });
  }

  public get(id: number) {
    return this.http.get<MovieModel>(`${this.baseUrl}/${id}`);
  }

  public recommendations(id: number, top: number) {
    const builder = new HttpParamsBuilder()
      .append('top', top);


    return this.http.get<MovieModel[]>(`${this.baseUrl}/recommendations/${id}`, { params: builder.params });
  }

  public getGenres() {
    return this.http.get<GenreModel[]>(`${this.baseUrl}/genres`);
  }
}
