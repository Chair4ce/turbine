import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import { membersFetchRequest } from '../../store/members';
import MemberModel from "../../store/members/MemberModel";
import Page from "../../components/layout/Page";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    data: MemberModel[];
    errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    membersFetchRequest: typeof membersFetchRequest;
}

interface RouteParams {
    memberId: string;
}

interface State {
    selected?: MemberModel;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com';

class ShowMembersPage extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = {};
    }

    public componentDidMount() {
        const { data, membersFetchRequest } = this.props;

        if (!data || data.length === 0) {
            membersFetchRequest();
        }
    }

    public render() {
        const { data, loading, match } = this.props;
        const selected = data.find(member => ((member.fullName) === match.params.memberId));

        return (
            <Page>
                <div>Members Show Page</div>
            </Page>
        );
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ members }: ApplicationState) => ({
    loading: members.loading,
    errors: members.errors,
    data: members.data,
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
    membersFetchRequest: membersFetchRequest,
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowMembersPage);
