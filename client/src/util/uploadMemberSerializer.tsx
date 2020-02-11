import UploadMemberModel from "../dispatchAndState/members/UploadMemberModel";
import moment from "moment";

export class UploadMemberDeserializer {
    static deserialize(items: any): UploadMemberModel[] {

        if (items.map) {
            return items.map((item: any) => {
                return new UploadMemberModel(
                    item.ssan,
                    item.full_name,
                    item.grade,
                    item.assigned_pas,
                    item.dafsc,
                    item.office_symbol,
                    item.duty_title,
                    moment(item.duty_start_date).utc().format(),
                    item.duty_phone,
                    item.supv_name,
                    moment(item.supv_begin_date).utc().format(),
                    moment(item.date_arrived_station).utc().format(),
                    moment(item.dor).utc().format(),
                );
            });
        }
        return [];
    }
}