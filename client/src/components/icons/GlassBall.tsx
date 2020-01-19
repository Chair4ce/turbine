import * as React from 'react';
import styled from "../../utils/styled";
import GlassAddIcon from "./GlassAddIcon";

const pathD1 = "M10.5 18C15.1944 18 19 14.1944 19 9.5C19 4.80558 15.1944 1 10.5 1C5.80558 1 2 4.80558 2 9.5C2 14.1944 5.80558 18 10.5 18ZM8 17C12.7441 18.7654 19.1772 15.0006 18.5 8.5C18.5 4.35786 14.6421 2 10.5 2C6.65216 2.33597 3.28324 5.6816 3 9.5C3.01821 12.5261 3.7194 13.8085 4.77975 15.1028C5.67599 16.1967 6.88241 16.5841 8 17Z";
const pathF1 = "M17.7148 7.60266C17.6411 12.1355 14.0083 18.0962 6.93935 16.1133C8.06735 16.6301 9.35503 16.7925 10.6988 16.8063C12.0427 16.8202 16.853 16.0367 17.912 10.6165C18.0357 9.87231 17.7993 8.82679 17.7148 7.60266Z";
const pathF2 = "M15.975 3.88535C14.9886 2.55193 13.7069 1.80684 12.1818 1.56719C10.3228 0.809511 6.4073 1.90548 4.54015 3.94945L7.20744 2.95631C7.32316 2.91322 7.44435 2.87946 7.56673 2.86302C10.6972 2.4425 11.6962 5.45717 14.2503 6.6731C15.4235 7.23161 16.0422 6.97418 16.3679 6.52267C16.9307 5.74261 16.547 4.65865 15.975 3.88535Z";
const GlassBallIcon = () => {
    return (
        <Wrapper>
        <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_c)">
                <path
                    d={pathD1}
                    fill='#FFFFFF'
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <g filter="url(#filter1_d)">
                <path
                    d={pathF1}
                    fill='#FFFFFF'
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <g filter="url(#filter2_e)">
                <path
                    d={pathF2}
                    fill='#FFFFFF'
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <g filter="url(#filter3_f)">
                <ellipse cx="6.18262" cy="7.08311" rx="2.00974" ry="1.35485" transform="rotate(128.307 6.18262 7.08311)" fill="white" fillOpacity="0.59"/>
            </g>

            <defs>
                <filter id="filter0_c" x="0" y="0" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                <filter id="filter1_d" x="6.43935" y="7.10266" width="12.0078" height="10.2039" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur"/>
                </filter>
                <filter id="filter2_e" x="4.04015" y="0.826538" width="13.1034" height="6.66496" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur"/>
                </filter>
                <filter id="filter3_f" x="3.37369" y="4.16626" width="5.61786" height="5.83376" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur"/>
                </filter>
            </defs>
        </svg>
            <GlassAddIcon/>
            <div
                className="Dimple">
            </div>
        </Wrapper>
    );
};

export default GlassBallIcon;

const Wrapper = styled('div')`

.Dimple {
position: absolute;
width: 15px;
height: 15px;
top: 2px;
right: 3px;
border-radius: 8px;
background: linear-gradient(191.77deg, #373737 8.62%, rgba(55, 55, 55, 0) 50.14%, rgba(255, 255, 255, 0.3) 88.33%);
z-index: 0;
}

.GlassAddIcon {
top: 3px;
right: 4px;
}

`;