import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { MoviesState, moviesReducer, initialMovieState } from '../home/store/reducers/home.reducer';
import { UserState, userReducer, initialUserState } from '../core/store/reducers/userDetails.reducer';

export interface State {
    movies: MoviesState;
    user: UserState;
}

// export const initialState: State = {
//     movies: initialMovieState
// };
export const reducers: ActionReducerMap<State> = {
    movies: moviesReducer,
    user: userReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getMovieState = createFeatureSelector<MoviesState>('movies');
export const nowPlayingMoviesSelector = createSelector(getMovieState, (state: MoviesState) => state.nowPlayingMovies);
export const upcomingMovieSelector = createSelector(getMovieState, (state: MoviesState) => state.upcomingMovies);
export const theaterList = createSelector(getMovieState, (state: MoviesState) => state.setTheaters);
export const loadingSelector = createSelector(getMovieState, (state: MoviesState) => state.loading);  
export const getUserState = createFeatureSelector<UserState>('user');
export const userSelector = createSelector(getUserState, (state: UserState) => state.user);

