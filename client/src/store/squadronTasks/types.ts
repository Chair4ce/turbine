// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
import SquadronTask from "./SquadronTaskModel";
import SquadronTaskDetail from "./squadronTaskDetailModel";

export enum SquadronTaskActionTypes {
    POST_SQUADRON_TASK_SUCCESS = '@@squadronTask/POST_SQUADRON_TASK_SUCCESS',
    POST_SQUADRON_TASK_DETAILS_SUCCESS = '@@squadronTask/POST_SQUADRON_TASK_DETAILS_SUCCESS',
    POST_SQUADRON_TASK_ERROR = '@@squadronTask/POST_SQUADRON_TASK_ERROR',
    POST_SQUADRON_TASK_UPDATE = '@@squadronTask/POST_SQUADRON_TASK_UPDATE',
    POST_SQUADRON_TASK_DELETE = '@@squadronTask/POST_SQUADRON_TASK_DELETE',
    POST_SQUADRON_TASK_REQUEST = '@@squadronTask/POST_SQUADRON_TASK_REQUEST',

}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface SquadronTaskState {
    readonly squadronTask: SquadronTask[];
    readonly squadronTaskDetails: SquadronTaskDetail[];
    readonly loading: boolean;
    readonly errors?: string;
}
