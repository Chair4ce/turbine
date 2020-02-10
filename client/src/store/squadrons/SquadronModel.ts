export default class SquadronModel {
    public squadron: string;
    public pas: string;
    public group_pas?: string | null;

    constructor(squadron: string, pas: string, group_pas?: string) {
        this.squadron = squadron;
        this.pas = pas;
        this.group_pas = group_pas;
    }
}