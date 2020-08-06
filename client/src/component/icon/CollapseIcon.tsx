import * as React from 'react';
import styled from "styled-components";

const CollapseIcon = () => {
    return (
        <Wrapper
            className="Collapse"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#C1C1C1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 2.28571V0H10V2.28571H0ZM0 9.14286H4V6.85714H0V9.14286ZM0 16H10V13.7143H0V16Z"/>
                <path d="M6 8.00002L16 0V16L6 8.00002Z"/>
            </svg>
        </Wrapper>
    );
};

export default CollapseIcon;

const Wrapper = styled('div')`


`;