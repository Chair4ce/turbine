import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from '../../utils/styled';
import Page from '../../components/layout/Page';
import Container from '../../components/layout/Container';
import DataTable from '../../components/layout/DataTable';
import LoadingSpinner from '../../components/data/LoadingSpinner';

import { ApplicationState } from '../../store';
import { Member } from '../../store/members/types';
import { fetchRequest } from '../../store/members/actions';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    data: Member[];
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class MembersIndexPage extends React.Component<AllProps> {
    public componentDidMount() {
        const { fetchRequest: fr } = this.props;
        fr();
    }

    private renderData() {
        const { loading, data } = this.props;
        return (
            <DataTable
                columns={['Member Name', 'Grade', 'DAFSC', 'Office']}
                widths={['auto', 'auto', 'auto', 'auto']}
            >
                {loading && data.length === 0 && (
                    <MemberLoading>
                        <td colSpan={3}>Loading...</td>
                    </MemberLoading>
                )}
                {data.map(member => (
                    <tr key={member.id}>
                        <MemberDetail>
                            <MemberName>
                                <Link to={`/members/${member.id + member.full_name}`}>{member.full_name}</Link>
                            </MemberName>
                        </MemberDetail>
                        <td>{member.grade}</td>
                        <td>{member.dafsc}</td>
                        <td>{member.office_symbol}</td>
                    </tr>
                ))}
            </DataTable>
        );
    }

    public render() {
        const { loading } = this.props;

        return (
            <Page>
                <Container>
                    <TableWrapper>
                        {loading && (
                                    <LoadingSpinner />
                        )}
                        {this.renderData()}
                    </TableWrapper>
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
    data: members.data,
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
    fetchRequest,
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MembersIndexPage);

const TableWrapper = styled('div')`
    position: relative;
    max-width: ${props => props.theme.widths.md};
    margin: 0 auto;
    min-height: 200px;
`;

const MemberDetail = styled('td')`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

// const MemberIcon = styled('img')`
//   width: 32px;
//   height: 32px;
// `

const MemberName = styled('div')`
    flex: 1 1 auto;
    height: 100%;
    margin-left: 1rem;

    a {
        color: ${props => props.theme.colors.brand};
    }
`;

const MemberLoading = styled('tr')`
    td {
        height: 48px;
        text-align: center;
    }
`;
