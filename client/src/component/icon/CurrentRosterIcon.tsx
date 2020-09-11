import * as React from 'react';
import styled from "styled-components";


const pathD = "M7.88 1.3H10.6667C11.4 1.3 12 1.885 12 2.6V11.7C12 12.415 11.4 13 10.6667 13H1.33333C1.24 " +
    "13 1.15333 12.9935 1.06667 12.9805C0.806667 12.9285 0.573333 12.7985 0.393333 12.623C0.273333 12.4995 " +
    "0.173333 12.363 0.106667 12.207C0.04 12.051 0 11.8755 0 11.7V2.6C0 2.418 0.04 2.249 0.106667 2.0995C0.173333 " +
    "1.9435 0.273333 1.8005 0.393333 1.6835C0.573333 1.508 0.806667 1.378 1.06667 1.326C1.15333 1.3065 1.24 1.3 " +
    "1.33333 1.3H4.12C4.4 0.546 5.13333 0 6 0C6.86667 0 7.6 0.546 7.88 1.3ZM2.66663 " +
    "3.90001H9.33329V5.20001H2.66663V3.90001ZM9.33329 6.5H2.66663V7.8H9.33329V6.5ZM7.33329 " +
    "9.09999H2.66663V10.4H7.33329V9.09999ZM6 1.13751C6.27333 1.13751 6.5 1.35851 6.5 1.62501C6.5 1.89151 " +
    "6.27333 2.11251 6 2.11251C5.72667 2.11251 5.5 1.89151 5.5 1.62501C5.5 1.35851 5.72667 1.13751 6 " +
    "1.13751ZM1.33337 11.7H10.6667V2.59999H1.33337V11.7Z"


const CurrentRosterIcon = () => {
    return (
        <Wrapper
            className="Collapse"
        >
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={pathD}
                       fill="#56899F"/>
            </svg>
        </Wrapper>
    );
};

export default CurrentRosterIcon;

const Wrapper = styled('div')`

`;