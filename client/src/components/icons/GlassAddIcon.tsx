import * as React from 'react';
import styled from "../../utils/styled";

const pathD1 = "M6 0.5V3.5C6 3.77614 5.77614 4 5.5 4H2.5C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H5.5C5.77614 5 6 5.22386 6 5.5V8.5C6 8.77614 6.22386 9 6.5 9C6.77614 9 7 8.77614 7 8.5V5.5C7 5.22386 7.22386 5 7.5 5H10.5C10.7761 5 11 4.77614 11 4.5C11 4.22386 10.7761 4 10.5 4H7.5C7.22386 4 7 3.77614 7 3.5V0.5C7 0.223858 6.77614 0 6.5 0C6.22386 0 6 0.223858 6 0.5Z";

const GlassAddIcon = () => {
    return (
        <Wrapper
        className="GlassAddIcon">
        <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_t)">
                <path
                    d={pathD1}
                    className="GlassAddIconPathD1"
                    fill='#FFFFFF'
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <defs>
                <filter id="filter0_t" x="0.5" y="0" width="12" height="12.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dy="2"/>
                    <feGaussianBlur stdDeviation="0.75"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
            </defs>
        </svg>
        </Wrapper>
    );
};

export default GlassAddIcon;

const Wrapper = styled('div')`
position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1px;
height: 100%;
width:100%;
.GlassAddIconPathD1 {
position: absolute;
 fill: ${props => props.theme.colors.brand};
}
`;