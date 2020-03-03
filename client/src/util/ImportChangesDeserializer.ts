import moment from "moment";
import ImportChangeModel from "../store/importChanges/ImportChangeModel";


export class ImportChangesDeserializer {
    static deserialize(items: any): ImportChangeModel[] {
        if (items.map) {
            return items.map((item: any) => {
                return new ImportChangeModel(
                    item.id,
                    item.sqid,
                    item.fullName,
                    moment(item.importDateTime).utc(true).toDate(),
                    item.field,
                    item.oldData,
                    item.newData,
            );
            });
        }
        return [];
    }
}

