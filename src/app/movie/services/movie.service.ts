import { of } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HttpParamsBuilder } from 'src/app/shared/utilities';
import { MovieModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private sourceUrl = 'http://image.tmdb.org/t/p/original';

  private arr: MovieModel[] = [
    { id: "1", title: "Toy Story", budget: 1000, overview: "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstan...", posterUrl: this.sourceUrl + "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg" },
    { id: "2", title: "Jumanji", budget: 1000, overview: "When siblings Judy and Peter discover an enchanted board game that opens the door to a magical world, they unwittingly invite Alan -- an adult who's been trapped inside the game for 26 years -- into t...	", posterUrl: this.sourceUrl + "/vzmL6fP7aPKNKPRTFnZmiUfciyV.jpg" },
    { id: "3", title: "Grumpier Old Men", budget: 1000, overview: "A family wedding reignites the ancient feud between next-door neighbors and fishing buddies John and Max. Meanwhile, a sultry Italian divorcée opens a restaurant at the local bait shop, alarming the l...	", posterUrl: this.sourceUrl + "/6ksm1sjKMFLbO7UY2i6G1ju9SML.jpg" },
    { id: "4", title: "Waiting to Exhale", budget: 1000, overview: "Cheated on, mistreated and stepped on, the women are holding their breath, waiting for the elusive 'good man' to break a string of less-than-stellar lovers. Friends and confidants Vannah, Bernie, Glo ...	", posterUrl: this.sourceUrl + "/16XOMpEaLWkrcPqSQqhTmeJuqQl.jpg" },
    { id: "5", title: "Father of the Bride Part II", budget: 1000, overview: "Just when George Banks has recovered from his daughter's wedding, he receives the news that she's pregnant ... and that George's wife, Nina, is expecting too. He was planning on selling their home, bu...	", posterUrl: this.sourceUrl + "/e64sOI48hQXyru7naBFyssKFxVd.jpg" },
    { id: "6", title: "Heat", budget: 1000, overview: "Obsessive master thief, Neil McCauley leads a top-notch crew on various insane heists throughout Los Angeles while a mentally unstable detective, Vincent Hanna pursues him without rest. Each man recog...	", posterUrl: this.sourceUrl + "/zMyfPUelumio3tiDKPffaUpsQTD.jpg" },
  ];

  private readonly baseUrl = `${environment.baseApiUrl}/api/movie`;

  constructor(private http: HttpClient) { }

  public search(pageIndex: number, pageSize: number) {
    return of(this.arr.slice(pageIndex * pageSize, (pageIndex * pageSize) + pageSize));

    // const builder = new HttpParamsBuilder()
    //   .append('pageIndex', pageIndex)
    //   .appendOptional('pageSize', pageSize);

    // return this.http.get<MovieModel[]>(`${this.baseUrl}/search`, { params: builder.params });
  }

  public get(id: string) {
    return of(this.arr.filter(x => x.id == id)[0]);

    // const builder = new HttpParamsBuilder()
    //   .append('id', id);

    // return this.http.get<MovieModel>(`${this.baseUrl}`, { params: builder.params });
  }

  public recommendations(relatedMovieId: string) {
    return of(this.shuffle(this.arr));

    // const builder = new HttpParamsBuilder()
    //   .append('relatedMovieId', relatedMovieId);

    // return this.http.get<MovieModel[]>(`${this.baseUrl}/recommendations`, { params: builder.params });
  }

  private shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
