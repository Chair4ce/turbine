import MemberModel from "../store/members/MemberModel";
import moment from "moment";


export class MemberDeserializer {
    static deserialize(items: any): MemberModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new MemberModel(
                    item.id,
                    item.sqid,
                    item.fullName,
                    moment(item.tafmsd).utc(true).toDate(),
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
                full_name: item.FULL_NAME,
                grade: item.GRADE,
                assigned_pas: item.ASSIGNED_PAS,
                dafsc: item.DAFSC,
                office_symbol: item.OFFICE_SYMBOL,
                duty_title: item.DUTY_TITLE,
                duty_start_date: item.DUTY_START_DATE,
                duty_phone: item.DUTY_PHONE,
                supv_name: item.SUPV_NAME,
                supv_begin_date: item.SUPV_BEGIN_DATE,
                date_arrived_station: item.DATE_ARRIVED_STATION,
                dor: item.DOR
            }
    }
}

