import {ShowModalActionTypes, ShowModalState} from "./types";
import {Reducer} from "redux";


export const initialState: ShowModalState= {
    csvInput: false,
};

const reducer: Reducer<ShowModalState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ShowModalActionTypes.SHOW_CSV_INPUT: {

            console.log("changing state: " + state + " to: " + action.payload);
            return {
                ...state,
                csvInput: action.payload
            };
        }
        default: {
            return state;
        }
    }
};


export {reducer as showModalReducer}