import * as React from 'react';
import GlassBallIcon from "../../icons/GlassBall";
import MenuTitleBar from "../../icons/MenuTitleBar";
import styled from "../../../utils/styled";

interface LeftNavBarMenuProps {
    menuTitle: string;
    rows: string[];
}

const LeftNavBarMenu: React.FC<LeftNavBarMenuProps> = ({children, menuTitle, rows}) => (
    <Wrapper>
        <Menu>
            <MenuTitle>
                <a>{menuTitle}</a>
                <MenuTitleBar/>
            </MenuTitle>
            <MenuActionBall>
                <GlassBallIcon/>
            </MenuActionBall>
        </Menu>
    </Wrapper>
);

export default LeftNavBarMenu;

const Wrapper = styled('div')`
display: block;
`;

const Menu = styled('div')`


`;

const MenuActionBall = styled('div')`
cursor: pointer;
position: absolute;
right: 6px;
top: 50px;
`;

const MenuTitle = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
a {
    width: 90%;
    height: 22px;
    position: absolute;
}

`;
