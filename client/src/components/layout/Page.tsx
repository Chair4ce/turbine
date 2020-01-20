import styled from '../../utils/styled';

const Page = styled('div')`
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    background-color: ${props => props.theme.colors.background};
`;

export default Page;
