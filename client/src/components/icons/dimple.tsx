import * as React from 'react';
import styled from "../../utils/styled";


const DimpleIcon = () => {
    return (
        <Wrapper
        className="Dimple"
        >
        <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="6.5" cy="6.5" r="6.5" fill="url(#paint0_linear)"/>
            <defs>
                <linearGradient id="paint0_linear" x1="6.5" y1="0" x2="4" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#373737"/>
                    <stop offset="0.520833" stopColor="#373737" stopOpacity="0"/>
                    <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                </linearGradient>
            </defs>
        </svg>
        </Wrapper>
    );
};

export default DimpleIcon;

const Wrapper = styled('div')`

`;