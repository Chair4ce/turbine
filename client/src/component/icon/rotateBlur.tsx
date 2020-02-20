import * as React from 'react';
import styled from "styled-components";

const pathD1 = "M11.5 1.5C5.36403 4.72072 3.52852 6.92938 1 13.0714C1.11993 13.9466 1.42583 14.1736 2.5 14C8.3549 10.8515 10.2296 8.84592 12.5 2.5C12.6031 1.56324 12.3902 1.33438 11.5 1.5Z";


const Blur = () => {
    return (
        <svg
            className="Blur"
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_h)">
                <path
                    d={pathD1}
                    fill='#FFFFFF'
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <defs>
                <filter id="filter0_h" x="0" y="0.450439" width="13.5239" height="14.6037" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur"/>
                </filter>
            </defs>
        </svg>
    );
};

export default Blur;