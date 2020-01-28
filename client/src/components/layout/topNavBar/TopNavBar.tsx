import * as React from 'react';
import styled from "styled-components";


const TopNavBar: React.FC = () => (
    <Wrapper>
        <TopNavBarBorder/>
    </Wrapper>
);

export default TopNavBar;

const TopNavBarBorder = styled('div')`
position: absolute;
width: 100%;
height: 1px;
top: 46px;
background: rgba(148,148,148,0.38);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25)`;


const Wrapper = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    position: fixed;
    top: 0;
    left: 199px;
    height: 46px;
    background: darkgray;
    color: darkcyan;
    z-index: 100;

`;
