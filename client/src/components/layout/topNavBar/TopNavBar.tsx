import * as React from 'react';
import SettingsIcon from "../../icons/SettingsIcon";
import styled from "../../../utils/styled";

const TopNavBar: React.FC = () => (
    <Wrapper>
        <TopNavBarBorder/>
        <AppButtonSection>
            <SettingsIcon/>
        </AppButtonSection>
    </Wrapper>
);

export default TopNavBar;

const TopNavBarBorder = styled('div')`
position: fixed;
width: 100vw;
height: 1px;
top: 46px;
left: 198px;
background: #949494;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25)`;

const AppButtonSection = styled('div')`
display: flex;
align-items: center;
position: fixed;
right: 0;
height: inherit;
padding-right: 10px;
margin: auto;
`;

const Wrapper = styled('div')`
    position: fixed;
    display: block;
    top: 0;
    width: 100%;
    height: 46px;
    background-color: ${props => props.theme.colors.MenuBackground};
    color: ${props => props.theme.colors.brand};
    font-family: ${props => props.theme.fonts.headings};
    z-index: 100;
`;
