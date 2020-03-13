import SquadronTask from "../store/squadronTasks/SquadronTaskModel";
import moment from "moment";

export class SquadronTaskDeserializer {
    static deserialize(items: any): SquadronTask[] {
        if (items.map) {
            return items.map((item: any) => {
                return new SquadronTask(
                    item.id,
                    item.mbrId,
                    item.taskType,
                    item.status,
                    moment(item.dueDate).utc(true).toDate()
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