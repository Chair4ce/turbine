import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import ShowMembersPage from './members/show';

import { ApplicationState } from '../store';
import MemberModel from "../store/members/MemberModel";
import MembersIndexPage from "./members";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    data: MemberModel[];
    errors?: string;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & RouteComponentProps;

const MembersPage: React.FC<AllProps> = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.path}/members`} component={MembersIndexPage} />
            <Route path={`${match.path}/:Id`} component={ShowMembersPage} />
        </Switch>
    );
};

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ members }: ApplicationState) => ({
    loading: members.loading,
    errors: members.errors,
    data: members.data,
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(MembersPage);
