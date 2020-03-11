import { IdName } from './id-name.model';
import { IsoName } from './iso-name.model';
import { CharacterActorModel } from './character-actor.model';


export class MovieModel {
    id: string;
    originalId: string;
    title: string;
    overview: string;
    budget?: number;
    posterPath: string;
    adult: boolean;
    genres: IdName[];
    imdbId: string
    originalLanguage: string;
    originalTitle: string;
    popularity: number;
    companies: IdName[];
    countries: IsoName[];
    releaseDate?: Date;
    revenue?: number;
    runtime?: number;
    languages: IsoName[];
    status: string;
    voteAverage: number;
    voteCount: number;
    cast: CharacterActorModel[];
    directors: string[];
    keywords: IdName[];
}
