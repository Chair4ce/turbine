import * as React from 'react';
import LeftNavBarMenu from "./LeftNavBarMenu";
import SettingsIcon from "../../icons/SettingsIcon";
import styled from "../../../utils/styled";
import {shine} from "../../animations/transitions";

interface LeftNavBarProps {
    title: string;
    squadrons?: string[];
}

const LeftNavBar: React.FC<LeftNavBarProps> = ({title}) => (
    <Wrapper>
        <LeftNavBarTitle>
            <Title
            className="chrome">{title}</Title>
        </LeftNavBarTitle>
    <LeftNavBarMenu menuTitle={"Squadron"} rows={['10IS','30IS']}/>
        <NavBorder>
        </NavBorder>
        <AppButtonSection>
        </AppButtonSection>
    </Wrapper>
);

export default LeftNavBar;

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
    background-color: ${props => props.theme.colors.MenuBackground};
    color: ${props => props.theme.colors.brand};
    font-family: ${props => props.theme.fonts.headings};
    z-index: 100;
`;

const LeftNavBarTitle = styled('div')`
    
    
  
    margin-left: 0;
    
 
html {
background-color: #333;
text-align: center
}

body {
padding-top: 3em;
}

.chrome {
margin: 0 auto 1em;
    margin-bottom: 0;
    height: 46px;
    padding: 10px
}

.chrome {
background: #222 -webkit-linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%) no-repeat 0 0;
-webkit-background-size: 200px;
color: rgba(255, 255, 255, 0.3);
-webkit-background-clip: text;
-webkit-animation-name: ${shine};
-webkit-animation-duration: 20s;
-webkit-animation-iteration-count: infinite;
text-shadow: 0 0 0 rgba(255, 255, 255, 0.5);
}

`;

const Title = styled('h2')`
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



