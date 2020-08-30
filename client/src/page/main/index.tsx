import * as React from 'react';
import {connect} from "react-redux";
import MainDashboard from "./MainDashboard";
import {
    getDistinctGainingAFSCCollection,
    getGainingMembers,
    getMembers,
    getOfficeCollection,
    getUniqueAFSCCollection
} from "../../store/members/thunks";
import {generateChartData} from "../../store/positions/thunks";
import {ApplicationState} from "../../store";

interface Props {
    getMembers: () => void;
    generateChartData: () => void;
    getOfficeCollection: () => void;
    getUniqueAFSCCollection: () => void;
    getGainingMembers: () => void;
    getDistinctGainingAFSCCollection: () => void;
    staging: boolean;
    classname?: string;
}

export class MainIndexPage extends React.Component<Props, any> {

    componentDidMount(): void {
        this.props.getMembers();
        this.props.generateChartData();
        this.props.getOfficeCollection();
        this.props.getUniqueAFSCCollection();
        this.props.getGainingMembers();
        this.props.getDistinctGainingAFSCCollection();
        // setInterval(() => {
        //     if (!this.props.staging) {
        //         this.props.getMembers();
        //     }
        // }, 5000)
    }

    public render() {
        return (
            <MainDashboard/>
        );
    }
}

const mapStateToProps = ({members}: ApplicationState) => ({
    staging: members.staging,
})

const mapDispatchToProps = {
    getMembers: getMembers,
    generateChartData: generateChartData,
    getOfficeCollection: getOfficeCollection,
    getUniqueAFSCCollection: getUniqueAFSCCollection,
    getGainingMembers: getGainingMembers,
    getDistinctGainingAFSCCollection: getDistinctGainingAFSCCollection,
}

export const StyledMainIndexPage = connect(mapStateToProps, mapDispatchToProps)(MainIndexPage);




