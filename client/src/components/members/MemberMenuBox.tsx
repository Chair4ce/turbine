import styled from "../../utils/styled";
import {darken} from "polished";
import {EaseIn} from "../animations/transitions";




export const MemberMenuBox = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 600px;
    position: relative;
    background: ${props => props.theme.colors.brand}
    overflow: hidden;
    border-radius: 8px;
    color: ${props => darken(0.25, props.theme.colors.white)};
    -webkit-animation: ${EaseIn} .5s;
`;



export const MenuButton = styled('div')`
display: flex;
flex-direction: column;
text-align: center;
width: 180px;
color: black;
-webkit-appearance: none;
border: none;
border-radius: 8px;
background: azure;
margin: 15px auto;
padding: 15px;
cursor: pointer;
transition: box-shadow 0.1s ease-out;

&:hover {
box-shadow: 0px 0px 15px black;
}
&:active {
box-shadow: 0px 0px 10px gray;
}
&:focus {
outline: none;
}
`;



