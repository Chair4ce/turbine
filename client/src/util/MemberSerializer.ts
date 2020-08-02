import UploadMemberModel from "../store/members/models/UploadMemberModel";
import moment from "moment";
import MemberModel from "../store/members/models/MemberModel";
import GenericGroupCollectionModel from "../store/members/models/GenericGroupCollectionModel";
import GainingMemberModel from "../store/members/models/GainingMemberModel";
import UploadGainingMemberModel from "../store/members/models/UploadGainingMemberModel";
import GenericGainingGroupCollectionModel from "../store/members/models/GenericGainingGroupCollectionModel";
const crypto = require('crypto');


function convertToHash(mbrId: string, name: string) {
    //This throws out everything except integers of the hash
    let newSsanHash = crypto.createHash('sha1').update(mbrId).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1,10);

    let newNameHash = crypto.createHash('sha1').update(name).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1,10);
    return newSsanHash + newNameHash;
}

export class MemberSerializer {
    static serializeToBackend(items: any): UploadMemberModel[] {
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

    static serializeFromBackend(items: any): MemberModel[] {
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

    static serializeGainingMembersToBackend(items: any): UploadGainingMemberModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new UploadGainingMemberModel(
                    convertToHash(item.mbrId ? item.mbrId : 0, item.fullName ? item.fullName : 0),
                    item.fullName ? item.fullName : null,
                    item.grade ? item.grade : null ,
                    item.losingPas ? item.losingPas : null,
                    item.losingPasCleartext ? item.losingPasCleartext : null,
                    item.dafsc ? item.dafsc : null,
                    item.sponsorId ? item.sponsorId : null,
                    item.dor ? item.dor : null,
                    item.dos ? item.dos: null,
                    item.rnltd ? item.rnltd : null,
                );
            });
        }
        return [];
    }

    static serializeGainingMembersFromBackend(items: any): GainingMemberModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new GainingMemberModel(
                    item.id,
                    item.mbrId ? item.mbrId : 0,
                    item.fullName ? item.fullName : null,
                    item.grade ? item.grade : null ,
                    item.losingPas ? item.losingPas : null,
                    item.losingPasCleartext ? item.losingPasCleartext : null,
                    item.dafsc ? item.dafsc : null,
                    item.sponsorId ? item.sponsorId : null,
                    item.dor ? item.dor : null,
                    item.dos ? item.dos: null,
                    item.rnltd ? item.rnltd : null,
                );
            });
        }
        return [];
    }

    static serializeUniqueCollectionFromBackend(items: any): GenericGroupCollectionModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new GenericGroupCollectionModel(
                    item.id,
                    item.genericGroup,
                    item.members,
                );
            });
        }
        return [];
    }

    static serializeGainingCollectionFromBackend(items: any): GenericGainingGroupCollectionModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new GenericGainingGroupCollectionModel(
                    item.id,
                    item.genericGroup,
                    item.members,
                );
            });
        }
        return [];
    }

}