import * as React from 'react';
import styled from "../../../utils/styled";

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
background: #949494;
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
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.brand};
    font-family: ${props => props.theme.fonts.headings};
    z-index: 100;

`;
