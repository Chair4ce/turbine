import {MemberActionTypes} from "./types";
import {membersReducer} from "./reducer";
import MemberModel from "./models/MemberModel";
import moment from "moment";

describe('reducer', () => {
    let memberList: MemberModel[];
    let date = new Date();
    beforeEach(() => {
        memberList = [
                new MemberModel(
                    1,
                    "987698751",
                    'Hoag, Jacy L',
                    'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    moment(date).utc(false).toDate(),
                    '',
                    '',
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate()),
                new MemberModel(
                    2,
                    "987698752",
                    'Hoag, Jacy L',
                    'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    moment(date).utc(false).toDate(),
                    '',
                    '',
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate()),
                new MemberModel(
                    3,
                    "987698753",
                    'Hoag, Jacy L',
                    'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    moment(date).utc(false).toDate(),
                    '',
                    '',
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate(),
                    moment(date).utc(false).toDate()),
        ];
    });

    it('should handle FETCH_SUCCESS', () => {
        let mockAction = {
            type: MemberActionTypes.FETCH_SUCCESS,
            payload: memberList,
        };

        let members = [
            new MemberModel(
                1,
                "987698751",
                'Hoag, Jacy L',
                'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                date,
                '',
                '',
                date,
                date,
                date,
                date,
                date,
                date),
            new MemberModel(
                2,"987698752",
                'Hoag, Jacy L',
                'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                date,
                '',
                '',
                date,
                date,
                date,
                date,
                date,
                date),
            new MemberModel(
                3,"987698753",
                'Hoag, Jacy L',
                'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                date,
                '',
                '',
                date,
                date,
                date,
                date,
                date,
                date),
        ];

        expect(
            membersReducer(undefined, mockAction)
        ).toEqual({
            data: members,
            successAlpha: true,
            successGaining: false,
            uploadStagingMember: [],
            uploadStagingGaining: [],
            gainingData: [],
            loading: false,
            staging: false,
            gainingLoading: false,
            genericAFSCList: [],
            genericGainingAFSCList: [],
            officeCollection: [],
            errors: undefined,
        });
    });


});