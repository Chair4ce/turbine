import MemberModel from "../dispatchAndState/members/MemberModel";
import moment from "moment";


export class MemberDeserializer {
    static deserialize(items: any): MemberModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new MemberModel(
                    item.id,
                    item.sqid,
                    moment(item.tafmsd).utc(true).toDate(),
                    item.fullName,
                    item.grade,
                    item.assignedPas,
                    item.dafsc,
                    item.officeSymbol,
                    item.dutyTitle,
                    moment(item.dutyStartDate).utc(true).toDate(),
                    item.dutyPhone,
                    item.supvName,
                    moment(item.supvBeginDate).utc(true).toDate(),
                    moment(item.dateArrivedStation).utc(true).toDate(),
                    moment(item.dor).utc(true).toDate(),
            )
                ;
            });
        }
        return [];
    }

    static serialize(item: any): {} {
            return {
                fullName: item.FULL_NAME,
                grade: item.GRADE,
                assignedPas: item.ASSIGNED_PAS,
                dafsc: item.DAFSC,
                officeSymbol: item.OFFICE_SYMBOL,
                dutyTitle: item.DUTY_TITLE,
                dutyStartDate: item.DUTY_START_DATE,
                dutyPhone: item.DUTY_PHONE,
                supvName: item.SUPV_NAME,
                supvBeginDate: item.SUPV_BEGIN_DATE,
                dateArrivedStation: item.DATE_ARRIVED_STATION,
                dor: item.DOR
            }
    }
}

