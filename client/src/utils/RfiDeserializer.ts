
import moment from 'moment';
import MemberModel from "../store/members/MemberModel";


export class MemberDeserializer {
  static deserialize(items: any): MemberModel[] {
    if (items.map) {
      return items.map((item: any) => {
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
      });
    }
    return [];
  }
}

