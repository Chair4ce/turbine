import * as React from 'react';
import styled from '../../utils/styled';
import SettingsIcon from "../icons/SettingsIcon";
import HeaderMenu from "./HeaderMenu";

interface HeaderProps {
    title: string;
    squadrons?: string[];
}

const NavMenu: React.FC<HeaderProps> = ({title}) => (
    <Wrapper>
        <HeaderTitle>
            <Title>{title}</Title>
        </HeaderTitle>
    <HeaderMenu menuTitle={"Squadron"} rows={['10IS','30IS']}/>
        <NavBorder>
        </NavBorder>
        <AppButtonSection>
        <SettingsIcon/>
        </AppButtonSection>
    </Wrapper>
);

export default NavMenu;

const AppButtonSection = styled('div')`
display: flex;
align-items: center;
position: fixed;
bottom: 0;
height: 45px;
padding-left: 5px;
`;

const Wrapper = styled('div')`
    position: fixed;
    display: block;
    width: 198px;
    height: 100vh;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.brand};
    font-family: ${props => props.theme.fonts.headings};
    z-index: 100;
`;

const HeaderTitle = styled('div')`
    margin-left: 0;
`;

const Title = styled('h2')`
    margin: 10px;
    font-weight: 500;
`;

const NavBorder = styled('div')`
position: absolute;
width: 1px;
height: 100%;
left: 198px;
top: 0px;
background: #949494;
/* Borders */

box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);

`;

const TopBorder = styled('div')`
position: absolute;
width: 100vw;
height: 1px;
left: 198px;
top: 55.5px;
background: #949494;

/* Borders */

box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
`;

