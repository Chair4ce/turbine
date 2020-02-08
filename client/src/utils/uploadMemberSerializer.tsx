import uploadMemberModel from "../store/members/uploadMemberModel";
import {Serializer} from "./Serializer";
import MemberModel from "../store/members/MemberModel";


export class UploadMemberDeserializer {
    static deserialize(items: any): uploadMemberModel[] {
        console.log(items);
        if (items.map) {
            return items.map((item: any) => {

                return new uploadMemberModel(
                    item.full_name,
                    item.grade,
                    item.assigned_pas,
                    item.dafsc,
                    item.office_symbol,
                    item.duty_title,
                    item.duty_start_date,
                    item.duty_phone,
                    "",
                    ""
                );
            });
        }
        return [];
    }
}