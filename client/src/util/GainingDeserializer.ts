import GainingModel from "../store/gaining/GainingModel";
import moment from "moment";


export class GainingDeserializer {
    static deserialize(items: any): GainingModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new GainingModel(
                    item.id,
                    item.sqid,
                    item.fullName,
                    item.firstName,
                    item.lastName,
                    moment(item.rnltd).utc(true).toDate(),
                    item.grade,
                    item.gainingPas,
                    moment(item.projectedArrivalDate).utc(true).toDate(),
                    item.dafsc,
                    item.cellPhone,
                    item.email,
                    moment(item.dor).utc(true).toDate(),
                    moment(item.dateArrivedStation).utc(true).toDate(),
                    item.projectedBilletId,
                    moment(item.dateDepLastDutyStn).utc(true).toDate(),
                    item.sponsorId,
                    item.losingPas,
                    item.projectedOfficeSymbol,
                    moment(item.lastUpdated).utc(true).toDate(),
                )
                    ;
            });
        }
        return [];
    }
}

