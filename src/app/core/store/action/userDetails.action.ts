import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserLogged {
    SET_USER = '[ User ] Set now logged in user',
    REMOVE_USER = '[ User ] Delete logged in user'
}

export class SetUser implements Action {
    readonly type = UserLogged.SET_USER;

    constructor(public payload: User) { }
}

export class RemoveUser implements Action {
    readonly type = UserLogged.REMOVE_USER;

    constructor() { }
}

export type UserDetailsActionTypes = SetUser | RemoveUser;
