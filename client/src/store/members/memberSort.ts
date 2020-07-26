import MemberModel from "./MemberModel";

export const sortAscendingGrade = (members: MemberModel[]) => {
    return members.sort(function (a, b) {
        return convertGradeValue(a.grade) > convertGradeValue(b.grade) ? -1 : 1;
    });
}

function convertGradeValue(grade: string) {
    switch (grade) {
        case 'AMN':
            return 1;
        case 'A1C':
            return 2;
        case 'SRA':
            return 3;
        case 'SSG':
            return 4;
        case 'TSG':
            return 5;
        case 'MSG':
            return 6;
        case 'SMS':
            return 7;
        case 'CMS':
            return 8;
        default :
                return 9;
    }
}