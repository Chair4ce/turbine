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
                    item.full_name,
                    item.grade,
                    item.assigned_pas,
                    item.dafsc,
                    item.office_symbol,
                    item.duty_title,
                    moment(item.duty_start_date).utc(true).toDate(),
                    item.duty_phone,
                    item.supv_name,
                    moment(item.supv_begin_date).utc(true).toDate(),
                    moment(item.date_arrived_station).utc(true).toDate(),
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

