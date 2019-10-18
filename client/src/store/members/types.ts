// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /members
export interface Member extends ApiResponse {
    _id: string;
    full_name: string;
    grade: String;
    assigned_pas: String;
    dafsc: String;
    office_symbol: String;
    duty_title: String;
    duty_start_date: String;
    duty_phone: String;
    awardec_status: String;
    epr_opr_status: String;
}

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
    readonly data: Member[];
    readonly errors?: string;
}
