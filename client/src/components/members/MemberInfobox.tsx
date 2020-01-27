import { darken } from 'polished';
import styled from '../../utils/styled';


export const MemberInfobox = styled('div')`
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    border-radius: 8px;
    color: ${props => darken(0.25, props.theme.colors.white)};
`;


export const MemberInfoboxInner = styled('div')`

    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 125px inset;
    z-index: 2;
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        flex-direction: row;
    }
`;


export const MemberInfoboxHeading = styled('div')`
    flex: 1 1 100%;
    margin: 1.5rem 0 0;
    text-align: center;

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        margin: 0 1.5rem;
        text-align: left;
    }
`;

export const MemberName = styled('h1')`
    margin: 0;
    color: ${props => props.theme.colors.white};
    font-weight: 500;
`;

