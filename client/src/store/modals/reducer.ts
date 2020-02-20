import {ShowModalActionTypes, ShowModalState} from "./types";
import {Reducer} from "redux";


export const initialState: ShowModalState= {
    uploadModal: false,
};

const reducer: Reducer<ShowModalState> = (state = initialState, action: any) => {
    switch (action.type) {
        case ShowModalActionTypes.TOGGLE_CSV_INPUT: {
            return {
                ...state,
                uploadModal: action.payload
            };
        }
        default: {
            return state;
        }
    }
};


export {reducer as showModalReducer}
export { initialState as ShowModalInitState }