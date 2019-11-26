import { Cast } from './cast.model';
import { Crew } from './crew.model';

export interface Movie {
    title: string;
    id: number;
    casts?: Cast[];
    crews?: Crew[];
    popularity: string;
    poster_path: string;
    release_date: string;
    original_language: string;
    overview: string;
    genre_ids: any;
    vote_average: number;
    vote_count: number;
}
