import MemberModel from "./MemberModel";

export class EnlistedGradeOnlySorter {
static sortEnlistedGradeOnlyAscending = (members: MemberModel[]) => {
    return members.sort(function (a, b) {
        return convertGradeValue(a.grade) > convertGradeValue(b.grade) ? -1 : 1;
    });
}
    static sortEnlistedGradeOnlyDescending = (members: MemberModel[]) => {
        function filterEnlisted(members: MemberModel[]) {
            return members.filter((mbr: MemberModel) => checkForEnlistedGrade(mbr.grade))
        }

        return filterEnlisted(members).sort(function (a, b) {
            return convertGradeValue(a.grade) < convertGradeValue(b.grade) ? -1 : 1;
        });
    }
static filterEnlisted = (members: MemberModel[]) => {
    return members.filter((mbr: MemberModel) => checkForEnlistedGrade(mbr.grade))
}
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

function checkForEnlistedGrade(grade: string) {
    switch (grade) {
        case 'AMN':
            return true;
        case 'A1C':
            return true;
        case 'SRA':
            return true;
        case 'SSG':
            return true;
        case 'TSG':
            return true;
        case 'MSG':
            return true;
        case 'SMS':
            return true;
        case 'CMS':
            return true;
        default :
            return false;
    }
}

