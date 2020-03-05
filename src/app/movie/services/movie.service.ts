import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HttpParamsBuilder } from 'src/app/shared/utilities';
import { MovieModel } from '../models';
import { ListData } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseUrl = `${environment.baseApiUrl}/api/movie`;

  constructor(private http: HttpClient) { }

  public search(filter: string, pageIndex: number, pageSize: number) {
    const builder = new HttpParamsBuilder()
      .append('filterText', filter)
      .append('pageIndex', pageIndex)
      .appendOptional('pageSize', pageSize);

    return this.http.get<ListData<MovieModel>>(`${this.baseUrl}`, { params: builder.params });
  }

  public get(id: number) {
    return this.http.get<MovieModel>(`${this.baseUrl}/${id}`);
  }

  public recommendations(id: number) {
    return this.http.get<MovieModel[]>(`${this.baseUrl}/recommendations/${id}`);
  }
}
