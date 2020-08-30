import * as React from 'react';
import {spin} from "../../style/animation/transitions";
import styled from "../../util/styled";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             zIndex: 5000,
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: 62,
//             width: 126,
//             display: 'flex'
//         },
//         iris: {
//             height: 60,
//             width: 62,
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             '&:hover': {
//                 cursor: 'pointer',
//                 animation: '1s ease-out 1',
//             },
//         },
//         background: {
//             height: 60,
//             width: 124,
//             position: 'absolute'
//         }
//     }),
// );


const pathD = "M14.875 2.18974C15.8215 1.76275 18.6304 0.93927 20.5539 0.93927C25.4694 3.53171 28.2172 8.47259 26.9044 14.1149C26.3014 13.7979 25.9557 13.6448 25.3167 13.4135C24.7367 8.22859 20.4317 3.6842 14.875 2.18974Z M7.18352 6.99827C7.87431 6.22364 10.1051 4.33008 11.8622 3.54855C17.4084 3.91963 21.9304 7.31688 23.0284 13.0049C22.3485 12.9602 21.9704 12.9608 21.2924 13.0091C18.6514 8.50817 12.8683 6.10579 7.18352 6.99827Z M2.43252 14.4257C2.74819 13.4374 4.01509 10.8011 5.30215 9.37321C10.5199 7.45876 16.1135 8.76217 19.4325 13.5123C18.7932 13.7477 18.4369 13.9405 17.8372 14.2601C13.5919 11.2214 7.26246 11.3006 2.43252 14.4257Z M0.983028 23.1905C0.868985 22.1594 0.952978 19.2363 1.54737 17.4089C5.53451 13.5399 11.2436 12.4972 16.2098 15.4881C15.7216 15.963 15.4381 16.2352 15.0204 16.7708C9.90483 15.7197 4.12296 18.3731 0.983028 23.1905Z M3.0007 31.9679C2.47667 31.0723 1.36323 28.3678 1.16217 26.4569C3.22931 21.3024 8.06309 17.968 13.8177 18.6825C13.5651 19.3147 13.4378 19.7454 13.2743 20.4044C8.17302 21.5227 3.90771 26.2913 3.0007 31.9679Z M8.6086 38.9072C7.76519 38.3019 5.64684 36.2836 4.6851 34.6196C4.47481 29.0709 7.53644 24.108 13.0844 22.4225C13.1111 23.1027 13.1221 23.4718 13.241 24.1403C9.03613 27.2346 7.12585 33.3528 8.6086 38.9072Z M16.5179 43.0254C15.501 42.8151 12.744 41.832 11.1879 40.7026C8.73652 35.719 9.5059 29.9452 13.888 26.1513C14.1892 26.7618 14.3405 27.1964 14.7214 27.7588C12.1399 32.294 12.9018 38.5536 16.5179 43.0254Z M25.4415 43.6747C24.4269 43.8958 21.508 44.1179 19.6265 43.7184C15.3579 40.1617 13.6985 34.7581 16.157 29.5117C16.6808 29.947 16.9871 30.1686 17.564 30.5276C17.0523 35.7196 20.3173 41.0588 25.4415 43.6747Z M33.9372 40.6113C33.1003 41.2255 30.5242 42.6144 28.6428 43.0139C23.2951 41.4991 19.5789 37.2368 19.6888 31.4451C20.3445 31.63 20.7145 31.708 21.3877 31.8015C23.0342 36.7526 28.1909 40.3036 33.9372 40.6113Z M40.4097 34.3946C39.8952 35.2958 38.1073 37.6113 36.5512 38.7407C31.049 39.5296 25.9187 37.1458 23.6609 31.8102C24.3352 31.7126 24.705 31.6335 25.358 31.4455C28.8781 35.2995 35.0348 36.4483 40.4097 34.3946Z M43.7262 25.9944C43.6231 27.0267 42.9326 29.8685 41.9709 31.5325C37.2656 34.4888 31.6083 34.3955 27.3731 30.4386C27.9494 30.0755 28.255 29.853 28.7751 29.4158C33.5601 31.5064 39.6522 30.0544 43.7262 25.9944Z M43.2436 17.1304C43.5698 18.1154 44.096 20.992 43.8949 22.9029C40.8002 27.5154 35.5939 29.7289 30.1138 27.8348C30.4925 27.2689 30.6811 26.9415 30.9781 26.3308C36.2007 26.2965 41.1749 22.4947 43.2436 17.1304Z M39.278 8.99415C39.977 9.76141 41.629 12.1755 42.2234 14.0029C41.2742 19.4741 37.4193 23.6115 31.6418 24.1078C31.7573 23.437 31.7963 23.0613 31.819 22.3827C36.5761 20.2294 39.5723 14.7352 39.278 8.99415Z M32.3746 3.31007C33.3256 3.72698 35.8177 5.26118 37.1047 6.6891C38.4653 12.0729 36.6283 17.4189 31.5523 20.2197C31.3847 19.56 31.2673 19.2009 31.0118 18.5718C34.4808 14.6718 34.981 8.43515 32.3746 3.31007Z M23.7607 0.983657C24.7992 0.978143 27.7005 1.36713 29.4577 2.14866C32.8927 6.5142 33.3912 12.1444 29.8945 16.7655C29.4728 16.2309 29.2193 15.9505 28.7298 15.4796C30.3109 10.5073 28.2285 4.60666 23.7607 0.983657Z"

const Iris = () => {

    return (
        <Wrapper
        >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    className={"iris"}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={pathD}
                    fill="#56899F"/>
            </svg>
        </Wrapper>
    );
};

export default Iris;

const Wrapper = styled('div')`
svg {
  position: absolute;
}
cursor: pointer;
  position: absolute;
  .iris {
  z-index: 3000;
  position: absolute;
  transform: translate(-50%,-50%);
  transform-origin: 18% 22px;
  }
 
// 
   :hover {
     .iris {
     animation: ${spin} 1s ease-out 1;
     }
     // .outer {
     // animation: 1s ease-out 1;
     // }
 }

`;