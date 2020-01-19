import {keyframes} from "@emotion/core";



export const EaseIn = keyframes`
  0% {
  display: none;
  opacity: 0 ;
  } 100% {
    opacity: 1;
  } 
`;

export const spin = keyframes`
0% {
transform: rotateZ(0);
}
100% {
transform: rotateZ(360deg);
}
`;

export const reverseSpin = keyframes`
0% {
transform: rotateZ(0);
}
100% {
transform: rotateZ(-360deg);
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

