// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
import ImportChangeModel from "./ImportChangeModel";

export enum ImportChangesActionTypes {
    POST_GAINING_SUCCESS = '@@importChanges/POST_GAINING_SUCCESS',
    POST_MEMBER_SUCCESS = '@@importChanges/POST_MEMBER_SUCCESS'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ImportChangesState {
    readonly gainingImportChanges: ImportChangeModel[];
    readonly memberImportChanges: ImportChangeModel[];
}
