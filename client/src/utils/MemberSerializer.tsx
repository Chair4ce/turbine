import {Serializer} from "./Serializer";
import MemberModel from "../store/members/MemberModel";


export class MemberSerializer implements Serializer<any> {
   static serialize(members: any): {} {
        return {
            id: members.id,
            full_name: members.FULL_NAME,
            grade: members.GRADE,
            assigned_pas: members.ASSIGNED_PAS,
            dafsc: members.DAFSC,
            office_symbol: members.OFFICE_SYMBOL,
            duty_title: members.DUTY_TITLE,
            duty_start_date: members.DUTY_START_DATE,
            duty_phone: members.DUTY_PHONE,
            awardec_status: "",
            epr_opr_status: ""
        };
    }


    deserialize(item: any): MemberModel {
        return new MemberModel(
            item.id,
            item.full_name,
            item.grade,
            item.assigned_pas,
            item.dafsc,
            item.office_symbol,
            item.duty_title,
            item.duty_start_date,
            item.duty_phone,
            item.awardec_status,
            item.epr_opr_status
        );
    }

    serialize(item: any): any {
    }

}