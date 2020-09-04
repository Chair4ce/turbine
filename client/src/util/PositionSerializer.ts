import MemberModel from "../store/members/models/MemberModel";
import PositionModel from "../store/positions/models/PositionModel";
import UploadPositionModel from "../store/positions/models/UploadPositionModel";
import ManningChartModel from "../store/positions/models/ManningChartModel";
import StagingUploadPositionModel from "../store/positions/models/StagingUploadPositionModel";


const crypto = require('crypto');


function convertToHash(mbrId: string) {
    //This throws out everything except integers of the hash
    // let newNameHash = crypto.createHash('sha1').update(name).digest('hex').toString()
    //     .match(/\d+/g).map(Number).join("").substring(1,10);
    let oldMbrId = mbrId;
    if(mbrId.length < 9) mbrId = "1" + mbrId;
    if(mbrId.length < 9) mbrId = "1" + mbrId;
    if(mbrId.length < 9) mbrId = "1" + mbrId;
    return crypto.createHash('sha1').update(mbrId.replace(/-/g, "")).digest('hex').toString()
        .match(/\d+/g).map(Number).join("").substring(1, 10);
}

export class PositionSerializer {
    static serializeToBackend(items: any): StagingUploadPositionModel[] {
        console.log("serializing to backend")
        if (items.map) {
            return items.map((item: any) => {
                return new UploadPositionModel(
                    item.pasCode,
                    item.orgStructureId ? item.orgStructureId : null,
                    item.afscAuth ? item.afscAuth : null,
                    item.grdAuth ? item.grdAuth : null,
                    item.currQtr,
                    item.projQtr1,
                    item.projQtr2,
                    item.projQtr3,
                    item.projQtr4,
                    item.posNr ? item.posNr : null,
                    item.gradeAssigned ? item.gradeAssigned : null,
                    item.dafscAssigned ? item.dafscAssigned : null,
                    item.nameAssigned ? item.nameAssigned : null,
                    item.mbrIdAssigned ? convertToHash(item.mbrIdAssigned.toString()) : null,
                );
            });
        }
        return [];
    }

    static serializeToStaging(items: any) {
        if (items.map) {
            return items.map((item: any, index: number) => {
                return new StagingUploadPositionModel(
                    index +1,
                    item.pasCode,
                    item.orgStructureId,
                    item.afscAuth,
                    item.grdAuth,
                    item.currQtr,
                    item.projQtr1,
                    item.projQtr2,
                    item.projQtr3,
                    item.projQtr4,
                    item.posNr,
                    item.gradeAssigned,
                    item.dafscAssigned,
                    item.nameAssigned,
                    item.mbrIdAssigned ? convertToHash(item.mbrIdAssigned.toString()) : null,
                );
            });
        }
        return [];
    }

    static serializeStagingToBackend(items: any): StagingUploadPositionModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new UploadPositionModel(
                    item.pasCode,
                    item.orgStructureId,
                    item.afscAuth,
                    item.grdAuth,
                    item.currQtr,
                    item.projQtr1,
                    item.projQtr2,
                    item.projQtr3,
                    item.projQtr4,
                    item.posNr,
                    item.gradeAssigned,
                    item.dafscAssigned,
                    item.nameAssigned,
                    item.mbrIdAssigned ? convertToHash(item.mbrIdAssigned.toString()) : null,
                );
            });
        }
        return [];
    }

    static serializeFromBackend(items: any): PositionModel[] {
        console.log("serializing from backend")
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
                    item.gradeAssigned,
                    item.dafscAssigned,
                    item.nameAssigned,
                    item.mbrIdAssigned,
                    item.lastUpdated ? item.lastUpdated : null
                );
            });
        }
        return [];
    }

    static serializeManningChartDataFromBackend(items: any): ManningChartModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new ManningChartModel(
                    item.afsc,
                    item.month.toString() + "-" + item.year.toString().substring(2,4),
                    item.manning,
                );
            });
        }
        return [];
    }

}