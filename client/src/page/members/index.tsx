import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../dispatchAndState';
import {membersFetchRequest} from '../../dispatchAndState/members/actions';
import MemberModel from "../../dispatchAndState/members/MemberModel";
import Page from "../../layout/Page";
import {ConnectedMemberTableContainer} from "../../mainContainer/MemberTableContainer";
import {squadronsFetchRequest} from "../../dispatchAndState/squadrons";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    csvInput: boolean;
    errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    membersFetchRequest: typeof membersFetchRequest;
    squadronsFetchRequest: typeof squadronsFetchRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class MembersIndexPage extends React.Component<AllProps> {
    componentDidMount(): void {
        setInterval(() => {
            this.refreshMembers();
        }, 5000);
        const { membersFetchRequest: fr , squadronsFetchRequest: sr } = this.props;
        fr();
        sr();
    }

    private refreshMembers() {
        if (this.props.csvInput){
        this.props.membersFetchRequest();
        console.log("fired");
        }
    }

    private refreshSquadrons() {
        this.props.squadronsFetchRequest();
    }

    public render() {
        return (
            <Page
            className="MembersPage">
                <ConnectedMemberTableContainer updateSquadrons={this.refreshSquadrons()}/>
            </Page>
        );
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ showModal }: ApplicationState) => ({
csvInput: showModal.csvInput
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
    membersFetchRequest,
    squadronsFetchRequest
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MembersIndexPage);




