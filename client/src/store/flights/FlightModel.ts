export default class FlightModel {
    public org_id: string;
    public pas_Code: string;

    constructor(org_id: string, pas_Code: string) {
        this.org_id = org_id;
        this.pas_Code = pas_Code;
    }
}