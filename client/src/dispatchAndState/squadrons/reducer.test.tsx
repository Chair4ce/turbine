import SquadronModel from "./SquadronModel";
import {SquadronActionTypes} from "./types";
import {squadronsReducer} from "./reducer";


describe('reducer', () => {
    let squadronList: SquadronModel[];

    beforeEach(() => {
        squadronList = [
            new SquadronModel('10IS','QWERTYTERTY'),
            new SquadronModel('45IS','QWERTYMERTY'),
            new SquadronModel('30IS','QWERTYWERTY')
        ];
    });

    it('should handle FETCH_SUCCESS', () => {
        let mockAction = {
            type: SquadronActionTypes.FETCH_SUCCESS,
            payload: squadronList,
        };

        let squadrons = [
            new SquadronModel('10IS','QWERTYTERTY'),
            new SquadronModel('45IS','QWERTYMERTY'),
            new SquadronModel('30IS','QWERTYWERTY')
        ];

        expect(
            squadronsReducer(undefined, mockAction)
        ).toEqual({
            squadrons: squadrons,
            errors: undefined,
            loading: false,
        });
    });


});