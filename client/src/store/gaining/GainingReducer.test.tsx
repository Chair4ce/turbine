import {GainingActionTypes} from "./types";
import {gainingReducer} from "./reducer";
import moment from "moment";
import GainingSavingModel from "./GainingSavingModel";

describe('reducer', () => {
    let gainingList: GainingSavingModel[];
    let MomentDate = moment().toDate().toISOString();
    beforeEach(() => {
        gainingList = [
            new GainingSavingModel(
                1,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                MomentDate,
                'TSGt',
                'IJNUHBYG',
                MomentDate,
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                MomentDate,
                MomentDate,
                '987UHB987',
                MomentDate,
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                MomentDate),
            new GainingSavingModel(
                2,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                MomentDate,
                'TSGt',
                'IJNUHBYG',
                MomentDate,
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                MomentDate,
                MomentDate,
                '987UHB987',
                MomentDate,
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                MomentDate),
            new GainingSavingModel(
                3,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                MomentDate,
                'TSGt',
                'IJNUHBYG',
                MomentDate,
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                MomentDate,
                MomentDate,
                '987UHB987',
                MomentDate,
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                MomentDate),
        ]
        ;
    });

    it('should handle FETCH_SUCCESS', () => {
        let mockAction = {
            type: GainingActionTypes.FETCH_SUCCESS,
            payload: gainingList,
        };

        // let gaining = [
        //     new GainingModel(
        //         1,
        //         '987698751.HOAG.JACY',
        //         'Hoag, Jacy L',
        //         'JACY',
        //         'HOAG',
        //         MomentDate,
        //         'TSGt',
        //         'IJNUHBYG',
        //         MomentDate,
        //         '3D1X2',
        //         '954-263-7315',
        //         'jacyLH@gmail.com',
        //         MomentDate,
        //         MomentDate,
        //         '987UHB987',
        //         MomentDate,
        //         'YGVTFCRD.SOMEONE',
        //         'UHBYGVTF',
        //         'SXCP',
        //         MomentDate),
        //     new GainingModel(
        //         2,
        //         '987698751.HOAG.JACY',
        //         'Hoag, Jacy L',
        //         'JACY',
        //         'HOAG',
        //         MomentDate,
        //         'TSGt',
        //         'IJNUHBYG',
        //         MomentDate,
        //         '3D1X2',
        //         '954-263-7315',
        //         'jacyLH@gmail.com',
        //         MomentDate,
        //         MomentDate,
        //         '987UHB987',
        //         MomentDate,
        //         'YGVTFCRD.SOMEONE',
        //         'UHBYGVTF',
        //         'SXCP',
        //         MomentDate),
        //     new GainingModel(
        //         3,
        //         '987698751.HOAG.JACY',
        //         'Hoag, Jacy L',
        //         'JACY',
        //         'HOAG',
        //         MomentDate,
        //         'TSGt',
        //         'IJNUHBYG',
        //         MomentDate,
        //         '3D1X2',
        //         '954-263-7315',
        //         'jacyLH@gmail.com',
        //         MomentDate,
        //         MomentDate,
        //         '987UHB987',
        //         MomentDate,
        //         'YGVTFCRD.SOMEONE',
        //         'UHBYGVTF',
        //         'SXCP',
        //         MomentDate),
        // ];

        expect(
            gainingReducer(undefined, mockAction)
        ).toEqual({
            data: gainingList,
            errors: undefined,
            loading: false
        });
    });


});