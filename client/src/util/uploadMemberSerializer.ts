import UploadMemberModel from "../store/members/UploadMemberModel";
import moment from "moment";
const crypto = require('crypto');


function convertToHash(sqid: string) {
    return crypto.createHash('sha1').update(sqid).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1,10);
}

export class UploadMemberDeserializer {
    static deserialize(items: any): UploadMemberModel[] {

        if (items.map) {
            return items.map((item: any) => {
                return new UploadMemberModel(
                    convertToHash(item.sqid),
                    item.fullName.toUpperCase(),
                    item.tafmsd ? moment(new Date(item.tafmsd)).utc().format(): null ,
                    item.grade,
                    item.assignedPas,
                    item.dafsc,
                    item.officeSymbol ? item.officeSymbol : null,
                    item.dutyTitle ? item.dutyTitle : null,
                    item.dutyStartDate ? moment(new Date(item.dutyStartDate)).utc().format() : null,
                    item.dutyPhone ? item.dutyPhone : null,
                    item.supvName.toUpperCase() ? item.supvName : null,
                    item.supvBeginDate ? moment(new Date(item.supvBeginDate)).utc().format() : null,
                    item.dateArrivedStation ? moment(new Date(item.dateArrivedStation)).utc().format() : null,
                    item.rnltd ? moment(new Date(item.rnltd)).utc().format() : null,
                    item.dor ? moment(new Date(item.dor)).utc().format() : null,
                );
            });
        }
        return [];
    }

}