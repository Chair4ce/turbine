export default class ManningChartModel {
    public afsc: string;
    public month: string;
    public value: string;

    constructor(afsc: string, month: string, value: string) {
        this.afsc = afsc;
        this.month = month;
        this.value = value;
    }
}