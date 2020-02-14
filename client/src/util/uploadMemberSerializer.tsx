import UploadMemberModel from "../dispatchAndState/members/UploadMemberModel";
import moment from "moment";

export class UploadMemberDeserializer {
    static deserialize(items: any): UploadMemberModel[] {

        if (items.map) {
            return items.map((item: any) => {
                return new UploadMemberModel(
                    item.tafmsd ? moment(new Date(item.tafmsd)).utc().format(): null ,
                    item.fullName,
                    item.grade,
                    item.assignedPas,
                    item.dafsc,
                    item.officeSymbol ? item.officeSymbol : null,
                    item.dutyTitle ? item.dutyTitle : null,
                    item.dutyStartDate ? moment(new Date(item.dutyStartDate)).utc().format() : null,
                    item.dutyPhone ? item.dutyPhone : null,
                    item.supvName ? item.supvName : null,
                    item.supvBeginDate ? moment(new Date(item.supvBeginDate)).utc().format() : null,
                    item.dateArrivedStation ? moment(new Date(item.dateArrivedStation)).utc().format() : null,
                    item.dor ? moment(new Date(item.dor)).utc().format() : null,
                );
            });
        }
        return [];
    }
}