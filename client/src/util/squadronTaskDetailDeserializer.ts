import moment from "moment";
import SquadronTaskDetail from "../store/squadronTasks/squadronTaskDetailModel";

export class SquadronTaskDetailDeserializer {
    static deserialize(items: any): SquadronTaskDetail[] {
        if (items.map) {
            return items.map((item: any) => {
                return new SquadronTaskDetail(
                    item.id,
                    item.mbrSqId,
                    item.mbrName,
                    item.taskType,
                    item.status,
                    moment(item.dueDate).utc(true).toDate(),
                    moment(item.rnltd).utc(true).toDate(),
                    item.supervisor,
                    item.supId
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