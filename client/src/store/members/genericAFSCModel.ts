import MemberModel from "./MemberModel";

export default class GenericAFSCCollection {
    public genericAFSC: string;
    public members: MemberModel[] | undefined;


    constructor(genericAFSC: string, members: MemberModel[]) {
        this.genericAFSC = genericAFSC;
        this.members = members;
    }
}