import PositionModel from "./PositionModel";
import MemberModel from "../../members/models/MemberModel";

export default class AssignedPositionModel {
    constructor(
        public position: PositionModel,
        public assigned: MemberModel | null,
    ) {
    }
}