import styled from '../../utils/styled';
import {EaseIn} from "../animations/transitions";




const PageContainer = styled('div')`
    width: 100%;
    margin-top: 47px;
    left: 199px;
    height: 100vh;
    position: relative;
    z-index: 99;
    background-color: ${props => props.theme.colors.background};
    max-width: ${props => props.theme.widths.md};

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        max-width: ${props => props.theme.widths.lg};
    }

    @media (min-width: ${props => props.theme.breakpoints.xl}) {
        max-width: ${props => props.theme.widths.xl};
    }
    -webkit-animation: ${EaseIn} .4s;
    
    h1 {
    margin-left: 30px;
    }
`;
export default PageContainer;
