import MemberModel from "../store/members/models/MemberModel";
import PositionModel from "../store/positions/models/PositionModel";
import UploadPositionModel from "../store/positions/models/UploadPositionModel";
import ManningChartModel from "../store/positions/models/ManningChartModel";
import StagingUploadPositionModel from "../store/positions/models/StagingUploadPositionModel";
import AssignedPositionModel from "../store/positions/models/AssignedPositionModel";


const sha1 = require('sha1');


function convertToHash(mbrId: string) {
    //This throws out everything except integers of the hash
    // let newNameHash = crypto.createHash('sha1').update(name).digest('hex').toString()
    //     .match(/\d+/g).map(Number).join("").substring(1,10);
    let oldMbrId = mbrId;
    if(mbrId.length < 9) mbrId = "1" + mbrId;
    return sha1(mbrId)
}

export class PositionSerializer {
    static serializeToBackend(items: any): StagingUploadPositionModel[] {
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

    static serializeAssignedPositionsFromBackend(items: AssignedPositionModel[]): AssignedPositionModel[] {
        if (items.map) {
            return items.map((item: AssignedPositionModel) => {
                return new AssignedPositionModel(
                new PositionModel(
                    item.position.id,
                    item.position.pasCode,
                    item.position.orgStructureId ? item.position.orgStructureId : null,
                    item.position.afscAuth ? item.position.afscAuth : null,
                    item.position.grdAuth ? item.position.grdAuth : null,
                    item.position.currQtr,
                    item.position.projQtr1,
                    item.position.projQtr2,
                    item.position.projQtr3,
                    item.position.projQtr4,
                    item.position.posNr,
                    item.position.gradeAssigned,
                    item.position.dafscAssigned,
                    item.position.nameAssigned,
                    item.position.mbrIdAssigned,
                    item.position.lastUpdated ? item.position.lastUpdated : null),
                   item.assigned ? new MemberModel(
                        item.assigned.id,
                        item.assigned.mbrId ? item.assigned.mbrId : "0",
                        item.assigned.fullName ? item.assigned.fullName : null,
                        item.assigned.grade ? item.assigned.grade : null ,
                        item.assigned.assignedPas ? item.assigned.assignedPas : null ,
                        item.assigned.dafsc ? item.assigned.dafsc : null ,
                        item.assigned.officeSymbol ? item.assigned.officeSymbol : null,
                        item.assigned.dutyTitle ? item.assigned.dutyTitle : null,
                        item.assigned.dutyStartDate ? item.assigned.dutyStartDate : null,
                        item.assigned.dutyPhone ? item.assigned.dutyPhone : null,
                        item.assigned.supvName ? item.assigned.supvName : null,
                        item.assigned.supvBeginDate ? item.assigned.supvBeginDate: null,
                        item.assigned.dateArrivedStation ? item.assigned.dateArrivedStation : null,
                        item.assigned.rnltd ? item.assigned.rnltd : null,
                        item.assigned.dor ? item.assigned.dor : null,
                        item.assigned.deros ? item.assigned.deros : null,
                        item.assigned.lastUpdated ? item.assigned.lastUpdated : null
                ) : null);
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
