
import moment from "moment";
import BilletModel from "../store/billet/BilletModel";
const crypto = require('crypto');


function convertToHash(sqid: string) {
    return crypto.createHash('sha1').update(sqid).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1,10);
}

export class BilletDeserializer {
    static deserialize(items: any): BilletModel[] {

        if (items.map) {
            return items.map((item: any) => {
                return new BilletModel(
                    item.id,
                    item.pasCode,
                    item.orgnStructId,
                    item.posNr,
                    item.afscAuth,
                    item.grdAuth,
                    item.currQtr,
                    item.projQtr1,
                    item.projQtr2,
                    item.projQtr3,
                    item.projQtr4,
                    item.mbrAssigned,
                );
            });
        }
        return [];
    }

}