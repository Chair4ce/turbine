import UploadMemberModel from "../dispatchAndState/members/UploadMemberModel";
import moment from "moment";

export class UploadMemberDeserializer {
    static deserialize(items: any): UploadMemberModel[] {

        if (items.map) {
            return items.map((item: any) => {
                return new UploadMemberModel(
                    item.tafmsd ? moment(item.tafmsd).utc().format() : null ,
                    item.full_name,
                    item.grade,
                    item.assigned_pas,
                    item.dafsc,
                    item.office_symbol ? item.office_symbol : null,
                    item.duty_title ? item.duty_title : null,
                    item.duty_start_date ? moment(item.duty_start_date).utc().format() : null,
                    item.duty_phone ? item.duty_phone : null,
                    item.supv_name ? item.supv_name : null,
                    item.supv_begin_date ? moment(item.supv_begin_date).utc().format() : null,
                    item.date_arrived_station ? moment(item.date_arrived_station).utc().format() : null,
                    item.dor ? moment(item.dor).utc().format() : null,
                );
            });
        }
        return [];
    }
}