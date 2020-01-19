import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import {
    MemberInfobox,
    // MemberInfoboxImage,
    MemberInfoboxHeading,
    MemberInfoboxInner,
    // MemberInfoboxBlurBackground,
    MemberName,
    // MemberRoles,
} from '../../components/members/MemberInfobox';
import {
    MemberStats,
    MemberStatsInner,
    // StatAttribute,
    // Bullet
} from '../../components/members/MemberStats';
import {
    MemberDetails,
    MemberDetailsColumn,
    MemberDetailsRow,
    MemberDetailsAttrName,
} from '../../components/members/MemberDetails';
import Page from '../../components/layout/Page';
import Container from '../../components/layout/Container';

import { ApplicationState } from '../../store';
import { Member } from '../../store/members/types';
import { fetchRequest } from '../../store/members/actions';
import styled from '../../utils/styled';
import LoadingSpinner from '../../components/data/LoadingSpinner';
import TopNavBar from "../../components/layout/topNavBar/TopNavBar";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    data: Member[];
    errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    fetchMembers: typeof fetchRequest;
}

interface RouteParams {
    memberId: string;
}

interface State {
    selected?: Member;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com';

const Wrapper = styled('div')`
    position: relative;
`;

class ShowMembersPage extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = {};
    }

    public componentDidMount() {
        const { data, fetchMembers } = this.props;

        if (!data || data.length === 0) {
            fetchMembers();
        }
    }

    public render() {
        const { data, loading, match } = this.props;
        const selected = data.find(member => ((member.id + member.full_name) === match.params.memberId));

        return (
            <Page>
                <TopNavBar/>
                <Container>
                    <Wrapper>
                        {loading && (
                                    <LoadingSpinner />
                        )}
                        {selected && (
                            <>
                                <MemberInfobox>
                                    <MemberInfoboxInner>
                                        <MemberInfoboxHeading>
                                            <MemberName>{selected.full_name}</MemberName>
                                        </MemberInfoboxHeading>
                                        <MemberStats>
                                            <MemberStatsInner>
                                                <MemberDetailsRow>{selected.dafsc}</MemberDetailsRow>
                                            </MemberStatsInner>
                                        </MemberStats>
                                    </MemberInfoboxInner>
                                </MemberInfobox>
                                <MemberDetails>
                                    <MemberDetailsColumn>
                                        <MemberDetailsRow>
                                            <MemberDetailsAttrName>DUTY TITLE:</MemberDetailsAttrName> {selected.duty_title}
                                        </MemberDetailsRow>
                                        <MemberDetailsRow>
                                            <MemberDetailsAttrName>Grade:</MemberDetailsAttrName> {selected.grade}
                                        </MemberDetailsRow>
                                    </MemberDetailsColumn>
                                    <MemberDetailsColumn>
                                        <MemberDetailsRow>
                                            <MemberDetailsAttrName>Office Symbol:</MemberDetailsAttrName>{' '}
                                            {selected.office_symbol}
                                        </MemberDetailsRow>
                                    </MemberDetailsColumn>
                                </MemberDetails>
                            </>
                        )}
                    </Wrapper>
                </Container>
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
    fetchMembers: fetchRequest,
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowMembersPage);
