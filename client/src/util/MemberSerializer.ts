import UploadMemberModel from "../store/members/UploadMemberModel";
import moment from "moment";
import MemberModel from "../store/members/MemberModel";
const crypto = require('crypto');


function convertToHash(mbrId: string, name: string) {
    //This throws out everything except integers of the hash
    let newSsanHash = crypto.createHash('sha1').update(mbrId).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1,10);

    let newNameHash = crypto.createHash('sha1').update(name).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1,10);
    console.log(newSsanHash + newNameHash)
    return newSsanHash + newNameHash;
}

export class CurrentMemberSerializer {
    static serializeToBackend(items: any): UploadMemberModel[] {
console.log(items);
        if (items.map) {
            return items.map((item: any) => {
                return new UploadMemberModel(
                    convertToHash(item.ssan ? item.ssan : 0, item.fullName ? item.fullName : 0),
                    item.fullName ? item.fullName : null,
                    item.grade ? item.grade : null ,
                    item.assignedPas ? item.assignedPas : null ,
                    item.dafsc ? item.dafsc : null ,
                    item.officeSymbol ? item.officeSymbol : null,
                    item.dutyTitle ? item.dutyTitle : null,
                    item.dutyStartDate ? item.dutyStartDate : null,
                    item.dutyPhone ? item.dutyPhone : null,
                    item.supvName ? item.supvName : null,
                    item.supvBeginDate ? item.supvBeginDate: null,
                    item.dateArrivedStation ? item.dateArrivedStation : null,
                    item.rnltd ? item.rnltd : null,
                    item.dor ? item.dor : null,
                );
            });
        }
        return [];
    }

    static SerializeFromBackend(items: any): MemberModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new MemberModel(
                    item.id,
                    item.mbrId ? item.mbrId : 0,
                    item.fullName ? item.fullName : null,
                    item.grade ? item.grade : null ,
                    item.assignedPas ? item.assignedPas : null ,
                    item.dafsc ? item.dafsc : null ,
                    item.officeSymbol ? item.officeSymbol : null,
                    item.dutyTitle ? item.dutyTitle : null,
                    item.dutyStartDate ? item.dutyStartDate : null,
                    item.dutyPhone ? item.dutyPhone : null,
                    item.supvName ? item.supvName : null,
                    item.supvBeginDate ? item.supvBeginDate: null,
                    item.dateArrivedStation ? item.dateArrivedStation : null,
                    item.rnltd ? item.rnltd : null,
                    item.dor ? item.dor : null,
                    item.lastUpdated ? item.lastUpdated : null
                );
            });
        }
        return [];
    }

}