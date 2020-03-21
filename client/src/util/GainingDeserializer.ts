import GainingModel from "../store/gaining/GainingModel";

const moment = require('moment');

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
                    item.rnltd == null ? undefined : moment(item.rnltd).utc(true).toDate(),
                    item.grade,
                    item.gainingPas,
                    item.projectedArrivalDate == null ? undefined : moment(item.projectedArrivalDate).utc(true).toDate(),
                    item.dafsc,
                    item.cellPhone,
                    item.email,
                    item.dor == null ? undefined : moment(item.dor).utc(true).toDate(),
                    item.dateArrivedStation == null ? undefined : moment(item.dateArrivedStation).utc(true).toDate(),
                    item.projectedBilletId,
                    item.dateDepLastDutyStn == null ? undefined : moment(item.dateDepLastDutyStn).utc(true).toDate(),
                    item.sponsorId,
                    item.losingPas,
                    item.projectedOfficeSymbol,
                    item.lastUpdated == null ? undefined : moment(item.lastUpdated).utc(true).toDate(),
                )
                    ;
            });
        }
        return [];
    }
}

