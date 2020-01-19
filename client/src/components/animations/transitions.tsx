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
transform: rotateZ(180deg);
}
`;

export const shine = keyframes`
0%, 10% {
background-position: -1000px;
}
20% {
background-position: top left;
}
90% {
background-position: top right;
}
100% {
background-position: 1000px;
}
`;

export const shinyRotation = keyframes`
 0% {
transform: rotateZ(25deg) rotateX(20deg) rotateY(0deg);
  }
  50% {
transform: rotateZ(-25deg) rotateX(-20deg) rotateY(180deg);
  }
  100% {
transform: rotateZ(25deg) rotateX(20deg) rotateY(360deg);
  }
`;

export const reverseSpin = keyframes`
0% {
transform: rotateZ(0);
}
100% {
transform: rotateZ(-180deg);
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

