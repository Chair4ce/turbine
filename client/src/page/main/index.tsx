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
import {ApplicationState} from "../../store";
import {History} from 'history';

interface Props {
    history: History;
    getMembers: () => void;
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
        this.props.getGainingMembers();
        // setInterval(() => {
        //     if (!this.props.staging) {
        //         this.props.getMembers();
        //     }
        // }, 5000)
    }

    public render() {
        return (
            <MainDashboard history={this.props.history}/>
        );
    }
}

const mapStateToProps = ({members}: ApplicationState) => ({
    staging: members.staging,
})

const mapDispatchToProps = {
    getMembers: getMembers,
    getOfficeCollection: getOfficeCollection,
    getUniqueAFSCCollection: getUniqueAFSCCollection,
    getGainingMembers: getGainingMembers,
    getDistinctGainingAFSCCollection: getDistinctGainingAFSCCollection,
}

export const StyledMainIndexPage = connect(mapStateToProps, mapDispatchToProps)(MainIndexPage);




