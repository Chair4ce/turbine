import MemberModel from "../store/members/models/MemberModel";
import PositionModel from "../store/positions/models/PositionModel";
import UploadPositionModel from "../store/positions/models/UploadPositionModel";


const crypto = require('crypto');


function convertToHash(mbrId: string) {
    //This throws out everything except integers of the hash
    // let newNameHash = crypto.createHash('sha1').update(name).digest('hex').toString()
    //     .match(/\d+/g).map(Number).join("").substring(1,10);
    return crypto.createHash('sha1').update(mbrId.replace(/-/g, "")).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1, 10);
}

export class PositionSerializer {
    static serializeToBackend(items: any): UploadPositionModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new UploadPositionModel(
                    item.pasCode,
                    item.orgStructureId ? item.orgStructureId : null,
                    item.afscAuth ? item.afscAuth : null,
                    item.grdAuth ? item.grdAuth : null,
                    item.currQtr ? item.currQtr : null,
                    item.projQtr1 ? item.projQtr1 : null,
                    item.projQtr2 ? item.projQtr2 : null,
                    item.projQtr3 ? item.projQtr3 : null,
                    item.projQtr4 ? item.projQtr4 : null,
                    item.posNr ? item.posNr : null,
                    item.gradeAssigned ? item.gradeAssigned: null,
                    item.dafscAssigned ? item.dafscAssigned : null,
                    item.nameAssigned ? item.nameAssigned : null,
                    item.mbrIdAssigned ? convertToHash(item.mbrIdAssigned) : null,
                    item.lastUpdated ? item.lastUpdated : null
                );
            });
        }
        return [];
    }

    static serializeFromBackend(items: any): PositionModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new PositionModel(
                    item.id,
                    item.pasCode,
                    item.orgStructureId ? item.orgStructureId : null,
                    item.afscAuth ? item.afscAuth : null,
                    item.grdAuth ? item.grdAuth : null,
                    item.currQtr,
                    item.projQtr1,
                    item.projQtr2,
                    item.projQtr3,
                    item.projQtr4,
                    item.posNr,
                    item.assignedMbrId,
                    item.doubleBillet.map((subItem: any) => { return new MemberModel(
                        subItem.id,
                        subItem.mbrId ? subItem.mbrId : 0,
                        subItem.fullName ? subItem.fullName : null,
                        subItem.grade ? subItem.grade : null ,
                        subItem.assignedPas ? subItem.assignedPas : null ,
                        subItem.dafsc ? subItem.dafsc : null ,
                        subItem.officeSymbol ? subItem.officeSymbol : null,
                        subItem.dutyTitle ? subItem.dutyTitle : null,
                        subItem.dutyStartDate ? subItem.dutyStartDate : null,
                        subItem.dutyPhone ? subItem.dutyPhone : null,
                        subItem.supvName ? subItem.supvName : null,
                        subItem.supvBeginDate ? subItem.supvBeginDate: null,
                        subItem.dateArrivedStation ? subItem.dateArrivedStation : null,
                        subItem.rnltd ? subItem.rnltd : null,
                        subItem.dor ? subItem.dor : null,
                        subItem.lastUpdated ? subItem.lastUpdated : null
                    ) }),
                    item.unfunded.map((subItem: any) => { return new MemberModel(
                        subItem.id,
                        subItem.mbrId ? subItem.mbrId : 0,
                        subItem.fullName ? subItem.fullName : null,
                        subItem.grade ? subItem.grade : null ,
                        subItem.assignedPas ? subItem.assignedPas : null ,
                        subItem.dafsc ? subItem.dafsc : null ,
                        subItem.officeSymbol ? subItem.officeSymbol : null,
                        subItem.dutyTitle ? subItem.dutyTitle : null,
                        subItem.dutyStartDate ? subItem.dutyStartDate : null,
                        subItem.dutyPhone ? subItem.dutyPhone : null,
                        subItem.supvName ? subItem.supvName : null,
                        subItem.supvBeginDate ? subItem.supvBeginDate: null,
                        subItem.dateArrivedStation ? subItem.dateArrivedStation : null,
                        subItem.rnltd ? subItem.rnltd : null,
                        subItem.dor ? subItem.dor : null,
                        subItem.lastUpdated ? subItem.lastUpdated : null
                    ) }),
                    item.lastUpdated ? item.lastUpdated : null
                );
            });
        }
        return [];
    }

}