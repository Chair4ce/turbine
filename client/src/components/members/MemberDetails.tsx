import { transparentize } from 'polished';
import styled from '../../utils/styled';

export const MemberDetailsAttrName = styled('span')`
    color: ${props => transparentize(0.25, props.theme.colors.body)};
    flex-grow: 1;
    font-size: 12px;
    margin-right: 5px;
    text-transform: uppercase;
`;

export const MemberDetailsRow = styled('span')`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    color: ${props => props.theme.colors.body};
    border-top: 1px solid ${props => props.theme.colors.borders};

    &:nth-of-type(even) {
        background: ${props => props.theme.colors.tableOdd};
    }

    &:last-of-type {
        border-bottom: 1px solid ${props => props.theme.colors.borders};
    }
`;

export const MemberDetailsColumn = styled('div')`
    display: flex;
    flex-direction: column;
    flex: 1 1 0px;
    padding: 8px;
`;

export const MemberDetails = styled('div')`
    display: flex;
    margin-top: 10px;
    margin-left: -8px;
    margin-right: -8px;
`;
