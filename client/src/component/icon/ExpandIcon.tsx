import * as React from 'react';
import styled from "styled-components";

const ExpandIcon = () => {
    return (
        <Wrapper
            className="Expand"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 2.28571V0H4V2.28571H0ZM0 9.14286H4V6.85714H0V9.14286ZM0 16H4V13.7143H0V16Z" fill="white"/>
                <path d="M16 8.00001L6 16V0L16 8.00001Z" fill="white"/>
            </svg>
        </Wrapper>
    );
};

export default ExpandIcon;

const Wrapper = styled('div')`

`;