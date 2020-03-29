// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
import ImportChangeModel from "./MemberImportChangeModel";
import MemberImportChangeModel from "./MemberImportChangeModel";
import GainingImportChangeModel from "./GainingImportChangeModel";
import BilletImportChangeModel from "./BilletImportChangeModel";

export enum ImportChangesActionTypes {
    POST_GAINING_SUCCESS = '@@importChanges/POST_GAINING_SUCCESS',
    POST_MEMBERS_SUCCESS = '@@importChanges/POST_MEMBER_SUCCESS',
    POST_BILLET_SUCCESS = '@@importChanges/POST_BILLET_SUCCESS',
    IMPORT_LOADING = '@@importChanges/IMPORT_LOADING',
    SET_IMPORT_LOADING = '@@importChanges/SET_IMPORT_LOADING',
    IMPORT_ERROR = '@@importChanges/IMPORT_ERROR',
    RESET_IMPORT_ERROR = '@@importChanges/SET_IMPORT_ERROR',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ImportChangesState {
    readonly gainingImportChanges: GainingImportChangeModel[];
    readonly memberImportChanges: MemberImportChangeModel[];
    readonly billetImportChanges: BilletImportChangeModel[];
    readonly loading: boolean;
    readonly errors?: string;
    readonly success?: boolean | undefined;
}
