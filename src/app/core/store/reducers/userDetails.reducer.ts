import { State } from '@ngrx/store';

import { UserLogged, UserDetailsActionTypes } from '../action/userDetails.action';
import { User } from '../../models/user.model';


export interface UserState {
    user: User;
}

export const initialUserState: UserState = {
    user: {
        id: '',
        name: '',
        email: '',
        image: '',
        token: '',
        role: '',
        preference: {
            language: '',
            genre: [],
            theater: [],
        },
        rating: {
            movieId: '',
            rating: ''
        }

    }
};


export function userReducer(state = initialUserState, action: UserDetailsActionTypes) {
    switch (action.type) {
        case UserLogged.SET_USER: {
            let newUserState = { ...state.user };
            newUserState = action.payload;
            return {
                ...state,
                user: newUserState
            };
        }
        case UserLogged.REMOVE_USER: {
            return {
                ...state,
                user: initialUserState.user
            };
        }

        default:
            return state;
    }
}
