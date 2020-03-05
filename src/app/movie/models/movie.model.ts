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

export class IdName {
    id: number;
    name: string;
}

export class CharacterActorModel {
    character: string;
    actorName: string;
}

export class IsoName {
    iso: number;
    name: string;
}

export class ListData<T>
{
    totalCount: number;
    items: T[];
}