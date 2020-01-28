import * as React from 'react';
import styled from "styled-components";


const LoadingSpinner: React.FC = () => (
        <Container>
            <Loader xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#5288AA"/>
                <circle cx="170" cy="170" r="135" stroke="#ffffff"/>
                <circle cx="170" cy="170" r="110" stroke="#5288AA"/>
                <circle cx="170" cy="170" r="85" stroke="#ffffff"/>
            </Loader>
        </Container>
);

export default LoadingSpinner;

const Container = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30vh;
    background-color: #212121;
`;

const Loader = styled('svg')`
    max-width: 15rem;
    width: 100%;
    height: auto;
    stroke-linecap: round;
`;





