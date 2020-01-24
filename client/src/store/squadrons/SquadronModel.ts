export default class SquadronModel {
    public squadron: string;
    public pas_Code: string;
    public group_Pas?: string | null;

    constructor(squadron: string, pas_Code: string, group_Pas?: string) {
        this.squadron = squadron;
        this.pas_Code = pas_Code;
        this.group_Pas = group_Pas;
    }
}