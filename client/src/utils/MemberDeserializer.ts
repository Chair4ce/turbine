import MemberModel from "../store/members/MemberModel";


export class MemberDeserializer {
    static deserialize(items: any): MemberModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new MemberModel(
                    item.id,
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
            )
                ;
            });
        }
        return [];
    }
}

