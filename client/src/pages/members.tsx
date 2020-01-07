import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import MembersIndexPage from './members/index';
import ShowMembersPage from './members/show';

import { ApplicationState } from '../store';
import { Member } from '../store/members/types';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    data: Member[];
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & RouteComponentProps;

const MembersPage: React.FC<AllProps> = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.path}/`} component={MembersIndexPage} />
            <Route path={`${match.path}/:memberId`} component={ShowMembersPage} />
        </Switch>
    );
};

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ members }: ApplicationState) => ({
    loading: members.loading,
    data: members.data,
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(MembersPage);
