import * as React from 'react';
import styled from '../../utils/styled';
import MenuTitleBar from "../icons/MenuTitleBar";
import GlassBallIcon from "../icons/GlassBall";

interface HeaderMenuProps {
    menuTitle: string;
    rows: string[];
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({children, menuTitle, rows}) => (
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

export default HeaderMenu;

const Wrapper = styled('div')`
display: block;
`;

const Menu = styled('div')`


`;

const MenuActionBall = styled('div')`
cursor: pointer;
position: absolute;
right: 6px;
top: 51px;
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
