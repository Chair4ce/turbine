import moment from 'moment';
import GainingMemberModel from "./GainingMemberModel";

export default class MemberModel {
    public id: number;
    public mbrId: string;
    public fullName: string;
    public grade: string;
    public assignedPas: string;
    public dafsc: string;
    public officeSymbol: string | undefined;
    public dutyTitle: string | undefined;
    public dutyStartDate: Date | undefined;
    public dutyPhone: string | undefined;
    public supvName: string | undefined;
    public supvBeginDate: Date | undefined;
    public dateArrivedStation: Date | undefined;
    public rnltd: Date | undefined;
    public dor: Date | undefined;
    public lastUpdated: Date | undefined;


    constructor(id: number, mbrId: string, fullName: string, grade: string, assignedPas: string, dafsc: string, officeSymbol: string | undefined, dutyTitle: string | undefined, dutyStartDate: Date | undefined, dutyPhone: string | undefined, supvName: string | undefined, supvBeginDate: Date | undefined, dateArrivedStation: Date | undefined, rnltd: Date | undefined, dor: Date | undefined, lastUpdated: Date | undefined) {
        this.id = id;
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.dafsc = dafsc;
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dutyPhone = dutyPhone;
        this.supvName = supvName;
        this.supvBeginDate = supvBeginDate;
        this.dateArrivedStation = dateArrivedStation;
        this.rnltd = rnltd;
        this.dor = dor;
        this.lastUpdated = lastUpdated;
    }

    public static sortByGradeDecending = (members: MemberModel[]) => {
        return members.sort(function (a, b) {
            return convertGradeValue(a.grade) > convertGradeValue(b.grade) ? -1 : 1;
        });
    }
    public static sortByGradeAscending = (members: MemberModel[]) => {
        return members.sort(function (a, b) {
            return convertGradeValue(a.grade) < convertGradeValue(b.grade) ? -1 : 1;
        });
    }
    public static sortByGradeGainingAscending = (members: GainingMemberModel[]) => {
        return members.sort(function (a, b) {
            return convertGradeValue(a.grade) < convertGradeValue(b.grade) ? -1 : 1;
        });
    }
    public static sortByDorAscending = (members: MemberModel[]) => {
        return members.sort(function (a, b) {
            return a.dor! < b.dor! ? -1 : 1;
        });
    }
    public static sortGainingDorAscending = (members: GainingMemberModel[]) => {
        return members.sort(function (a, b) {
            return a.dor! < b.dor! ? -1 : 1;
        });
    }



    public static filterEnlistedOnly = (members: MemberModel[]) => {
        return members.filter((m) => isEnlisted(m.grade) && (m.dafsc))
    }

    public static filterGainingEnlistedOnly = (members: GainingMemberModel[]) => {
        return members.filter((m) => isEnlisted(m.grade) && (m.dafsc))
    }

    public static membersMatchingGafsc = (uAFSC: string, members: MemberModel[]) => {
        return members.filter((m) => m.dafsc ? m.dafsc.substring(0, 3) + "X" + m.dafsc.substring(4) === uAFSC : "")
    }
    public static membersMatchingOffice = (office: string, members: MemberModel[]) => {
        return members.filter((m) => m.officeSymbol ? m.officeSymbol === office : "")
    }

    public static generateUniqueAFSCList = (members: MemberModel[]) => {
        return [...new Set(members.map(item => item.dafsc.substring(0, 3) + "X" + item.dafsc.substring(4)))];
    }
}


function isEnlisted(grade: string) {
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



