import GainingModel from "../store/gaining/GainingModel";
import moment from "moment";
import GainingSavingModel from "../store/gaining/GainingSavingModel";
export class GainingDeserializer {
    static deserialize(items: any): GainingModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new GainingSavingModel(
                    item.id,
                    item.sqid,
                    item.fullName,
                    item.firstName,
                    item.lastName,
                    item.rnltd == null ? undefined : moment(item.rnltd).toISOString(),
                    item.grade,
                    item.gainingPas,
                    item.projectedArrivalDate == null ? undefined : moment(item.projectedArrivalDate).toISOString(),
                    item.dafsc,
                    item.cellPhone,
                    item.email,
                    item.dor == null ? undefined : moment(item.dor).toISOString(),
                    item.dateArrivedStation == null ? undefined : moment(item.dateArrivedStation).toISOString(),
                    item.projectedBilletId,
                    item.dateDepLastDutyStn == null ? undefined : moment(item.dateDepLastDutyStn).toISOString(),
                    item.sponsorId,
                    item.losingPas,
                    item.projectedOfficeSymbol,
                    item.lastUpdated == null ? undefined : moment(item.lastUpdated).toISOString(),
                )
                    ;
            });
        }
        return [];
    }
}

