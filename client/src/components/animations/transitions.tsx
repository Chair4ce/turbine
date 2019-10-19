import {keyframes} from "@emotion/core";



export const EaseIn = keyframes`
  0% {
  display: none;
  opacity: 0 ;
  } 100% {
    opacity: 1;
  } 
`;

export const EaseOut = keyframes`
  0% {
  opacity: 1;
  } 80% {
    display: block;
    opacity: 0;
  }100% {
    display: none;
    opacity: 0;
  } 
`;

