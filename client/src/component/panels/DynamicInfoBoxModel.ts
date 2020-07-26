import moment from "moment";

export default class DynamicInfoBoxModel {

    public rowTitle: string;
    public rowInfo: string;


    constructor(rowTitle: string, rowInfo: string) {
        this.rowTitle = rowTitle;
        this.rowInfo = isValidDate(rowInfo);
    }


}

function isValidDate(data: string) {
    let formats = [
        moment.ISO_8601,
        "MM/DD/YYYY"
    ];
   if (moment(data, formats, true).isValid()) {
       return moment(data).format('MMM-DD-YYYY')
   } else {
       return data;
   }
}