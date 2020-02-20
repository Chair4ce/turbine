import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

import ShowMembersPage from '../page/members/show';

import { ApplicationState } from '../store';
import MemberModel from "../store/members/MemberModel";
import MembersIndexPage from "./memberRoutes";

// Separate state props + dispatch props to their own interfaces.
interface Props {

}
// Combine both state + dispatch props - as well as any props we want to pass - in a union type.

const MembersPage: React.FC<Props> = () => {
    return (
        <Switch>
            <Route exact path={`/members`} component={MembersIndexPage} />
            {/*<Route path={`${match.path}/:Id`} component={ShowMembersPage} />*/}
        </Switch>
    );
};

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.


// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default MembersPage;
