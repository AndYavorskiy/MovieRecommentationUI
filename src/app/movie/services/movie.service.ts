import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HttpParamsBuilder } from 'src/app/shared/utilities';
import { MovieModel, ListData, GenreModel, MovieSearchFilterModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseUrl = `${environment.baseApiUrl}/api/movie`;

  constructor(private http: HttpClient) { }

  public search(movieSearchFilter: MovieSearchFilterModel) {
    const builder = new HttpParamsBuilder(movieSearchFilter);

    return this.http.get<ListData<MovieModel>>(`${this.baseUrl}`, { params: builder.params });
  }

  public get(id: number) {
    return this.http.get<MovieModel>(`${this.baseUrl}/${id}`);
  }

  public setNoPoster(id: number) {
    return this.http.get<void>(`${this.baseUrl}/${id}/SetNoPoster`);
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
