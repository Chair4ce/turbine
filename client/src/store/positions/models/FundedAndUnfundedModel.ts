import PositionModel from "./PositionModel";
import AssignedPositionModel from "./AssignedPositionModel";

export default class FundedAndUnfundedModel {
    constructor(
        public position: AssignedPositionModel,
        public unfunded: AssignedPositionModel[],
    ) {
    }
}