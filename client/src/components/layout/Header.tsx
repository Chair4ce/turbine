import * as React from 'react';
import {NavLink} from 'react-router-dom';
import styled from '../../utils/styled';
import Container from "./Container";

interface HeaderProps {
    title: string;
}

const Wrapper = styled('header')`
    
    width: 100%;
    padding: 0.5rem 1.5rem;
    background-color: ${props => props.theme.colors.brand};
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.fonts.headings};
    position: fixed;
    z-index: 100;
`;

const HeaderInner = styled(Container)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        flex-direction: row;
    }
`;

const HeaderTitle = styled('div')`
    margin-left: 0;
`;

const HeaderNav = styled('nav')`
    flex: 1 1 auto;
    margin: 1rem 0 1rem 2rem;
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        margin: 0;
    }
`;

const HeaderNavLink = styled(NavLink)`
    margin: 0 1rem;

    &.is-active {
        text-decoration: underline;
    }
`;

// const HeaderRight = styled('div')`
//     padding-left: 1rem;
// `;

const Title = styled('h2')`
    margin: 0;
    font-weight: 500;
`;

// const CurrentTheme = styled('span')`
//     margin-right: 1rem;
// `;
//
// const ThemeSwitcherButton = styled('button')`
//     display: inline-block;
//     padding: 0.25rem 0.5rem;
//     border: 1px solid ${props => props.theme.colors.white};
//     border-radius: 3px;
//     background-color: ${props => props.theme.colors.white};
//     color: ${props => props.theme.colors.brand};
//     font-size: 0.8rem;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     cursor: pointer;
//     transition: all 0.3s ease;
//
//     &:hover,
//     &:focus {
//         background-color: transparent;
//         color: ${props => props.theme.colors.white};
//     }
// `;

const Header: React.FC<HeaderProps> = ({ title }) => (
    <Wrapper>
        <HeaderInner>
            <HeaderTitle>
                <Title>{title}</Title>
            </HeaderTitle>
            <HeaderNav>
                <HeaderNavLink exact to="/" activeClassName="is-active">
                    Home
                </HeaderNavLink>
                <HeaderNavLink to="/members" activeClassName="is-active">
                    Members
                </HeaderNavLink>
            </HeaderNav>
        </HeaderInner>
    </Wrapper>
);

export default Header;
