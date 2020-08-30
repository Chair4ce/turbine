import PositionModel from "./models/PositionModel";
import MemberModel from "../members/models/MemberModel";
import ManningChartModel from "./models/ManningChartModel";
import UploadPositionModel from "./models/UploadPositionModel";
import StagingUploadPositionModel from "./models/StagingUploadPositionModel";

export enum PositionActionTypes {
    FETCH_REQUEST = '@@positions/FETCH_REQUEST',
    SET_SUCCESS = '@@positions/SET_SUCCESS',
    STAGE_UPLOAD_DATA = '@@positions/STAGE_UPLOAD_DATA',
    FETCH_ERROR = '@@positions/FETCH_ERROR',
    FETCH_SUCCESS = '@@positions/FETCH_SUCCESS',
    FETCH_CHARTDATA_SUCCESS = '@@positions/FETCH_CHARTDATA_SUCCESS',

    FETCH_DOUBLEBILLET_REQUEST = '@@positions/FETCH_DOUBLEBILLET_EQUEST',
    FETCH_DOUBLEBILLET_ERROR = '@@positions/FETCH_DOUBLEBILLET_ERROR',
    FETCH_DOUBLEBILLET_SUCCESS = '@@positions/FETCH_DOUBLEBILLET_SUCCESS',

    FETCH_UNASSIGNED_REQUEST = '@@positions/FETCH_UNASSIGNED_EQUEST',
    FETCH_UNASSIGNED_ERROR = '@@positions/FETCH_UNASSIGNED_ERROR',
    FETCH_UNASSIGNED_SUCCESS = '@@positions/FETCH_UNASSIGNED_SUCCESS',
    FETCH_UNFUNDED_REQUEST = '@@positions/FETCH_UNFUNDED_EQUEST',
    FETCH_UNFUNDED_ERROR = '@@positions/FETCH_UNFUNDED_ERROR',
    FETCH_UNFUNDED_SUCCESS = '@@positions/FETCH_UNFUNDED_SUCCESS',
}

export interface PositionState {
    readonly loading: boolean;
    readonly positions: PositionModel[];
    readonly upload: UploadPositionModel[];
    readonly uploadStagingPosition: StagingUploadPositionModel[];
    readonly success: boolean;
    readonly error?: string;

    readonly chartData: ManningChartModel[];

    readonly unassignedLoading: boolean;
    readonly unassignedMembers: MemberModel[];
    readonly unassignedError?: string;

    readonly unFundedLoading: boolean;
    readonly unFundedMembers: MemberModel[];
    readonly unFundedError?: string;

    readonly doubleBilletedLoading: boolean;
    readonly doubleBilletedMembers: MemberModel[];
    readonly doubleBilletedError?: string;
}