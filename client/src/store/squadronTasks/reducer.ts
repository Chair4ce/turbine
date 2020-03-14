import {Reducer} from 'redux';
import { SquadronTaskActionTypes, SquadronTaskState} from "./types";
import SquadronTask from "./SquadronTaskModel";
import {SquadronTaskDetailDeserializer} from "../../util/squadronTaskDetailDeserializer";
import {SquadronTaskDeserializer} from "../../util/squadronTaskDeserializer";
import SquadronTaskDetail from "./squadronTaskDetailModel";



// Type-safe initialState!
export const initialState: SquadronTaskState = {
    squadronTask: [] as SquadronTask[],
    squadronTaskDetails: [] as SquadronTaskDetail[],
    loading: false,
    errors: "",
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<SquadronTaskState> = (state = initialState, action) => {
    switch (action.type) {
        case SquadronTaskActionTypes.POST_SQUADRON_TASK_DETAILS_SUCCESS: {
            console.log(action.payload);
            return { ...state, loading: false, squadronTaskDetails: SquadronTaskDetailDeserializer.deserialize(action.payload) };
        }
        case SquadronTaskActionTypes.POST_SQUADRON_TASK_SUCCESS: {
            return { ...state, loading: false, squadronTask: SquadronTaskDeserializer.deserialize(action.payload) };
        }
        case SquadronTaskActionTypes.POST_SQUADRON_TASK_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case SquadronTaskActionTypes.POST_SQUADRON_TASK_ERROR: {
            return {
                ...state,
                errors: ""
            };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as squadronTaskReducer };
export { initialState as SquadronTaskInitState }