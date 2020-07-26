import MemberModel from "./MemberModel";

export default class GenericGroupCollectionModel {
    public genericGroup: string;
    public members: MemberModel[] | undefined;

    constructor(genericGroup: string, members: MemberModel[]) {
        this.genericGroup = genericGroup;
        this.members = members;
    }
}