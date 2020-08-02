import MemberModel from "./MemberModel";

export default class GenericGroupCollectionModel {
    public id: number;
    public genericGroup: string;
    public members: MemberModel[] | undefined;


    constructor(id: number, genericGroup: string, members: MemberModel[] | undefined) {
        this.id = id;
        this.genericGroup = genericGroup;
        this.members = members;
    }
}