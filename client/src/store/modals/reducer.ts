import {ShowModalActionTypes, ShowModalState} from "./types";
import {Reducer} from "redux";


export const initialState: ShowModalState= {
    csvInput: true,
};

const reducer: Reducer<ShowModalState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ShowModalActionTypes.SHOW_CSV_INPUT: {
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