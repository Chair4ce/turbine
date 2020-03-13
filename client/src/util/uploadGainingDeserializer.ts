import UploadGainingModel from "../store/gaining/UploadGainingModel";
import moment from "moment";
const crypto = require('crypto');


function convertToHash(sqid: string) {
    return crypto.createHash('sha1').update(sqid).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1,10);
}

export class UploadGainingDeserializer {
    static deserialize(items: any): UploadGainingModel[] {

        if (items.map) {
            return items.map((item: any) => {
                return new UploadGainingModel(
                    convertToHash(item.sqid),
                    item.fullName,
                    item.rnltd ? moment(item.rnltd).utc(true).toDate(): null,
                    item.grade,
                    item.gainingPas,
                    item.dafsc,
                    item.dor ? moment(item.dor).utc(true).toDate(): null,
                    item.dateDepLastDutyStn ? moment(item.dateDepLastDutyStn).utc(true).toDate(): null,
                    item.sponsorId ? convertToHash(item.sponsorId): null,
                    item.losingPas,
                );
            });
        }
        return [];
    }

}