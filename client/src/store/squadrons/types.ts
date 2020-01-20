

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
import SquadronModel from "./SquadronModel";

export enum SquadronActionTypes {
    FETCH_REQUEST = '@@squadrons/FETCH_REQUEST',
    FETCH_SUCCESS = '@@squadrons/FETCH_SUCCESS',
    FETCH_ERROR = '@@squadrons/FETCH_ERROR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface SquadronsState {
    readonly loading: boolean;
    readonly squadrons: SquadronModel[];
    readonly errors?: string;
}
