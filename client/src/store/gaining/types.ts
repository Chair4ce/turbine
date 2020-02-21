// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /members

import GainingModel from "./GainingModel";

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>;

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum GainingActionTypes {
    FETCH_REQUEST = '@@gaining/FETCH_REQUEST',
    FETCH_SUCCESS = '@@gaining/FETCH_SUCCESS',
    FETCH_ERROR = '@@gaining/FETCH_ERROR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface GainingState {
    readonly loading: boolean;
    readonly data: GainingModel[];
    readonly errors?: string;
}
