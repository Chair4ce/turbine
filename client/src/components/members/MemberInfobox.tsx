import { darken } from 'polished';

import styled from '../../utils/styled';
import {EaseIn} from "../animations/transitions";


export const MemberInfobox = styled('div')`
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    border-radius: 8px;
    color: ${props => darken(0.25, props.theme.colors.white)};
    -webkit-animation: ${EaseIn} .4s;
`;

export const MemberInfoboxBlurBackground = styled('img')`
    position: absolute;
    top: -12.5%;
    left: -12.5%;
    width: 125%;
    height: 125%;
    filter: blur(25px);
    object-fit: cover;
    opacity: 0.35;
    background-repeat: no-repeat;
    z-index: 1;
`;

export const MemberInfoboxInner = styled('div')`

    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 125px inset;
    z-index: 2;
-webkit-animation: ${EaseIn} .4s;
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        flex-direction: row;
    }
`;

export const MemberInfoboxImage = styled('img')`
    display: block;
    flex-shrink: 0;
    width: 180px;
    height: 128px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 32px;
    object-fit: cover;
    border-radius: 16px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    border-image: initial;
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

export const MemberRoles = styled('p')`
    margin: 0.5rem 0 0;
    color: ${props => props.theme.colors.white};
    font-size: 0.8rem;
    letter-spacing: 1px;
    text-transform: uppercase;

    & span {
        color: ${props => darken(0.25, props.theme.colors.white)};
    }
`;
