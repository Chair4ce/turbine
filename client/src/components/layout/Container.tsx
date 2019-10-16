import styled from '../../utils/styled';
import {EaseIn} from "../animations/transitions";




const Container = styled('div')`
    margin-left: 0;
    width: 100%;
    max-width: ${props => props.theme.widths.md};

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        max-width: ${props => props.theme.widths.lg};
    }

    @media (min-width: ${props => props.theme.breakpoints.xl}) {
        max-width: ${props => props.theme.widths.xl};
    }
    -webkit-animation: ${EaseIn} .4s;
`;

export default Container;
