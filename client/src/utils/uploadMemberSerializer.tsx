import uploadMemberModel from "../store/members/uploadMemberModel";


export class UploadMemberDeserializer {
    static deserialize(items: any): uploadMemberModel[] {
        console.log(items);
        if (items.map) {
            return items.map((item: any) => {

                return new uploadMemberModel(
                    item.ssan,
                    item.full_name,
                    item.grade,
                    item.assigned_pas,
                    item.office_symbol,
                    item.duty_title,
                    item.duty_start_date,
                    item.dafsc,
                    item.duty_phone,
                    item.supv_name,
                    item.supv_begin_date,
                    item.dor,
                    item.date_arrived_station
                );
            });
        }
        return [];
    }
}