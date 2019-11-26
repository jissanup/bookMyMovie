import { Preferences } from 'src/app/core/models/preference.model';
import { Ratings } from 'src/app/core/models/rating.model';

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    token: string;
    role: string;
    preference: Preferences;
    rating: Ratings;
}
