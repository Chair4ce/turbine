// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /members

import MemberModel from "./MemberModel";

// export interface Member extends ApiResponse {
//     id: string;
//     full_name: string;
//     grade: string;
//     assigned_pas: string;
//     dafsc: string;
//     office_symbol: string;
//     duty_title: string;
//     duty_start_date: string;
//     duty_phone: string;
//     awardec_status: string;
//     epr_opr_status: string;
// }

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>;

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum MembersActionTypes {
    FETCH_REQUEST = '@@members/FETCH_REQUEST',
    FETCH_SUCCESS = '@@members/FETCH_SUCCESS',
    FETCH_ERROR = '@@members/FETCH_ERROR',
    SELECT_MEMBER = '@@members/SELECT_MEMBER',
    SELECTED = '@@members/SELECTED',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface MembersState {
    readonly loading: boolean;
    readonly data: MemberModel[];
    readonly errors?: string;
}
