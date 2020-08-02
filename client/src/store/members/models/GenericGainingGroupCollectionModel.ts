import GainingMemberModel from "./GainingMemberModel";

export default class GenericGainingGroupCollectionModel {
    public id: number;
    public genericGroup: string;
    public members: GainingMemberModel[] | undefined;


    constructor(id: number, genericGroup: string, members: GainingMemberModel[] | undefined) {
        this.id = id;
        this.genericGroup = genericGroup;
        this.members = members;
    }
}