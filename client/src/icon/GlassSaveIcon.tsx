import * as React from 'react';
import styled from "styled-components";

const pathD1 = "M2.36005 10.0013C1.78578 10.0004 1.19221 9.38107 1.77862 8.14506C2.36503 6.90905 1.77862 8.14503 2.36503 6.90905C2.95144 5.67306 3.14156 6.71742 3.53286 7.53637C3.92797 8.36333 4.60839 9.38653 5.47061 9.38792L8.60216 9.39296C9.46439 9.39435 10.1481 8.37335 10.5459 7.54766C10.9398 6.72996 11.1333 5.68622 11.7157 6.92409C12.2981 8.16199 11.7157 6.92408 12.2981 8.16199C12.8806 9.39989 12.285 10.0173 11.7107 10.0164L2.36005 10.0013Z";
const pathD2 = "M7.5354 4.09788L7.5354 0.5C7.5354 0.223858 7.31154 0 7.0354 0C6.75926 0 6.5354 0.223858 6.5354 0.5L6.5354 4.09788C6.5354 4.49059 6.10343 4.73002 5.7704 4.52188L4.11243 3.48564C3.67901 3.21476 3.16639 3.69188 3.40553 4.14358L6.59351 10.1653C6.78131 10.5201 7.28949 10.5201 7.47729 10.1653L10.6653 4.14358C10.9044 3.69188 10.3918 3.21476 9.95837 3.48564L8.3004 4.52188C7.96738 4.73002 7.5354 4.49059 7.5354 4.09788Z";

const GlassSaveIcon = () => {
    return (
        <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d)">
                <path
                    d={pathD1}
                    fill='#FFFFFF'
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <g filter="url(#filter1_d)">
                <path
                    d={pathD2}
                    fill='#337E83'
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <defs>
                <filter id="filter0_d" x="0.536896" y="6.34033" width="13" height="5.67604" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                <filter id="filter1_d" x="2.34459" y="0" width="9.38161" height="12.4314" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
            </defs>
        </svg>
    );
};

export const StyledGlassSaveIcon = styled(GlassSaveIcon)`

`;