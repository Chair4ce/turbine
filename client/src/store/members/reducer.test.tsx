import {MemberActionTypes} from "./types";
import {membersReducer} from "./reducer";
import MemberModel from "./MemberModel";

describe('reducer', () => {
    let memberList: MemberModel[];

    beforeEach(() => {
        memberList = [
                new MemberModel(1, 'Hoag, Jacy L', 'TSgt',
                    '10IS',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    '',
                    '',
                    '',
                    ''),
                new MemberModel(
                    2,
                    'Hoag, Jacy L',
                    'TSgt',
                    '10IS',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    '',
                    '',
                    '',
                    ''),
                new MemberModel(
                    3,
                    'Hoag, Jacy L',
                    'TSgt',
                    '10IS',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    '',
                    '',
                    '',
                    '')
        ];
    });

    it('should handle FETCH_SUCCESS', () => {
        let mockAction = {
            type: MemberActionTypes.FETCH_SUCCESS,
            payload: memberList,
        };

        let members = [
            new MemberModel(1, 'Hoag, Jacy L', 'TSgt',
                '10IS',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                '',
                '',
                '',
                ''),
            new MemberModel(
                2,
                'Hoag, Jacy L',
                'TSgt',
                '10IS',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                '',
                '',
                '',
                ''),
            new MemberModel(
                3,
                'Hoag, Jacy L',
                'TSgt',
                '10IS',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                '',
                '',
                '',
                ''),
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