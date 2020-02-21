import {GainingActionTypes} from "./types";
import {gainingReducer} from "./reducer";
import GainingModel from "./GainingModel";
import moment from "moment";

describe('reducer', () => {
    let gainingList: GainingModel[];
    let date = new Date();
    beforeEach(() => {
        gainingList = [
            new GainingModel(
                1,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                moment(date).utc(false).toDate(),
                'TSGt',
                'IJNUHBYG',
                moment(date).utc(false).toDate(),
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                moment(date).utc(false).toDate(),
                moment(date).utc(false).toDate(),
                '987UHB987',
                moment(date).utc(false).toDate(),
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                moment(date).utc(false).toDate()),
            new GainingModel(
                2,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                moment(date).utc(false).toDate(),
                'TSGt',
                'IJNUHBYG',
                moment(date).utc(false).toDate(),
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                moment(date).utc(false).toDate(),
                moment(date).utc(false).toDate(),
                '987UHB987',
                moment(date).utc(false).toDate(),
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                moment(date).utc(false).toDate()),
            new GainingModel(
                3,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                moment(date).utc(false).toDate(),
                'TSGt',
                'IJNUHBYG',
                moment(date).utc(false).toDate(),
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                moment(date).utc(false).toDate(),
                moment(date).utc(false).toDate(),
                '987UHB987',
                moment(date).utc(false).toDate(),
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                moment(date).utc(false).toDate()),
        ]
        ;
    });

    it('should handle FETCH_SUCCESS', () => {
        let mockAction = {
            type: GainingActionTypes.FETCH_SUCCESS,
            payload: gainingList,
        };

        let gaining = [
            new GainingModel(
                1,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                moment(date).utc(true).toDate(),
                'TSGt',
                'IJNUHBYG',
                moment(date).utc(true).toDate(),
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                moment(date).utc(true).toDate(),
                moment(date).utc(true).toDate(),
                '987UHB987',
                moment(date).utc(true).toDate(),
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                moment(date).utc(true).toDate()),
            new GainingModel(
                2,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                moment(date).utc(true).toDate(),
                'TSGt',
                'IJNUHBYG',
                moment(date).utc(true).toDate(),
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                moment(date).utc(true).toDate(),
                moment(date).utc(true).toDate(),
                '987UHB987',
                moment(date).utc(true).toDate(),
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                moment(date).utc(true).toDate()),
            new GainingModel(
                3,
                '987698751.HOAG.JACY',
                'Hoag, Jacy L',
                'JACY',
                'HOAG',
                moment(date).utc(true).toDate(),
                'TSGt',
                'IJNUHBYG',
                moment(date).utc(true).toDate(),
                '3D1X2',
                '954-263-7315',
                'jacyLH@gmail.com',
                moment(date).utc(true).toDate(),
                moment(date).utc(true).toDate(),
                '987UHB987',
                moment(date).utc(true).toDate(),
                'YGVTFCRD.SOMEONE',
                'UHBYGVTF',
                'SXCP',
                moment(date).utc(true).toDate()),
        ];

        expect(
            gainingReducer(undefined, mockAction)
        ).toEqual({
            data: gaining,
            errors: undefined,
            loading: false
        });
    });


});