import UploadMemberModel from "../store/members/UploadMemberModel";
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
                    moment(item.duty_start_date).utc().toISOString(),
                    item.duty_phone,
                    item.supv_name,
                    moment(item.supv_begin_date).utc().toISOString(),
                    moment(item.date_arrived_station).utc().toISOString(),
                    moment(item.dor).utc().toISOString(),
                );
            });
        }
        return [];
    }
}