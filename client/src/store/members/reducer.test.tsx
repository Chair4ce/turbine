import {MemberActionTypes} from "./types";
import {membersReducer} from "./reducer";
import MemberModel from "./MemberModel";

describe('reducer', () => {
    let memberList: MemberModel[];
    let date = new Date();
    beforeEach(() => {

        memberList = [
                new MemberModel(1, '576-21-2783','Hoag, Jacy L', 'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    date,
                    '',
                    '',
                    date,
                    date,
                    date),
                new MemberModel(
                    2,'576-21-2783','Hoag, Jacy L', 'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    date,
                    '',
                    '',
                    date,
                    date,
                    date),
                new MemberModel(
                    3,'576-21-2783','Hoag, Jacy L', 'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    date,
                    '',
                    '',
                    date,
                    date,
                    date),
        ];
    });

    it('should handle FETCH_SUCCESS', () => {
        let mockAction = {
            type: MemberActionTypes.FETCH_SUCCESS,
            payload: memberList,
        };

        let members = [
            new MemberModel(1, '576-21-2783','Hoag, Jacy L', 'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                date,
                '',
                '',
                date,
                date,
                date),
            new MemberModel(
                2,'576-21-2783','Hoag, Jacy L', 'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                date,
                '',
                '',
                date,
                date,
                date),
            new MemberModel(
                3,'576-21-2783','Hoag, Jacy L', 'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                date,
                '',
                '',
                date,
                date,
                date),
        ];

        expect(
            membersReducer(undefined, mockAction)
        ).toEqual({
            data: members,
            errors: undefined,
            loading: false
        });
    });


});