import * as React from 'react';
import styled from '../../utils/styled';
import GlassBallIcon from "./GlassBall";
const pathD1 = "M198 0H0V27H198V0ZM182.5 23C187.747 23 192 18.7467 192 13.5C192 8.25329 187.747 4 182.5 4C177.253 4 173 8.25329 173 13.5C173 18.7467 177.253 23 182.5 23Z";

const MenuTitleBar = () => {
    return (
        <Wrapper
        className="MenuTitleBar"
        >
        <svg
            width="199"
            height="29"
            viewBox="0 0 199 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d)">
                <path
                    className="MenuTitleBarPathD1"
                    d={pathD1}
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <defs>
                <filter id="filter0_d" x="-1" y="0" width="200" height="29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
            </defs>
        </svg>
            <ActionBall>
                <GlassBallIcon/>
            </ActionBall>
        </Wrapper>
    );
};

export default MenuTitleBar;



const Wrapper = styled('div')`
width: 100%;
height: 29px;
 display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
.MenuTitleBarPathD1 {
fill: ${props => props.theme.colors.menuTitleBar};
}

`;

const ActionBall = styled('div')`
position: absolute;
right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
cursor: pointer;
width: 21px;
height: 21px;
`;