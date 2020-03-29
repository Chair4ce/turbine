
import UploadBilletModel from "../store/billet/UploadBilletModel";

const crypto = require('crypto');


function convertToHash(sqid: string) {
    return crypto.createHash('sha1').update(sqid).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1, 10);
}

export class UploadBilletDeserializer {
    static deserialize(items: any): UploadBilletModel[] {

        if (items.map) {
            return items.map((item: any) => {
                console.log(item);
                if(item.posNr != null || item.posNr != '') {
                return new UploadBilletModel(
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
                    convertToHash(item.mbrAssigned)
                );
                }
            });
        }
        return [];
    }

}