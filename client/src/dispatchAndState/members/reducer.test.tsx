import {MemberActionTypes} from "./types";
import {membersReducer} from "./reducer";
import MemberModel from "./MemberModel";
import moment from "moment";

describe('reducer', () => {
    let memberList: MemberModel[];
    let date = new Date;
    beforeEach(() => {

        memberList = [
                new MemberModel(1, '576-21-2783','Hoag, Jacy L', 'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    moment(date).utc(true).format(),
                    '',
                    '',
                    moment(date).utc(true).format(),
                    moment(date).utc(true).format(),
                    moment(date).utc(true).format()),
                new MemberModel(
                    2,'576-21-2783','Hoag, Jacy L', 'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    moment(date).utc(true).format(),
                    '',
                    '',
                    moment(date).utc(true).format(),
                    moment(date).utc(true).format(),
                    moment(date).utc(true).format()),
                new MemberModel(
                    3,'576-21-2783','Hoag, Jacy L', 'TSgt',
                    'UHBIJNUG87',
                    '3D1X2',
                    'SXCP',
                    'NCOIC, SDT',
                    moment(date).utc(true).format(),
                    '',
                    '',
                    moment(date).utc(true).format(),
                    moment(date).utc(true).format(),
                    moment(date).utc(true).format()),
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
                moment(date).utc(true).format('DD MMM YY'),
                '',
                '',
                moment(date).utc(true).format('DD MMM YY'),
                moment(date).utc(true).format('DD MMM YY'),
                moment(date).utc(true).format('DD MMM YY')),
            new MemberModel(
                2,'576-21-2783','Hoag, Jacy L', 'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                moment(date).utc(true).format('DD MMM YY'),
                '',
                '',
                moment(date).utc(true).format('DD MMM YY'),
                moment(date).utc(true).format('DD MMM YY'),
                moment(date).utc(true).format('DD MMM YY')),
            new MemberModel(
                3,'576-21-2783','Hoag, Jacy L', 'TSgt',
                'UHBIJNUG87',
                '3D1X2',
                'SXCP',
                'NCOIC, SDT',
                moment(date).format('DD MMM YY'),
                '',
                '',
                moment(date).format('DD MMM YY'),
                moment(date).format('DD MMM YY'),
                moment(date).format('DD MMM YY')),
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