import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../../services';
import { MovieModel, IdName } from '../../models';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public topSimilar = 15;
  public movie: MovieModel;
  public recommendations: MovieModel[];

  constructor(private readonly movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieService
        .get(+params.get('id'))
        .subscribe(data => this.movie = data);

      this.movieService
        .recommendations(+params.get('id'), this.topSimilar)
        .subscribe(data => this.recommendations = data);
    });
  }

  getNames(data: IdName[]) {
    return data.map((x: { name: string; }) => x.name).join(", ");
  }
}
