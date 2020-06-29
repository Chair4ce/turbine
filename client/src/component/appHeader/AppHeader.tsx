import * as React from "react";
import styled from 'styled-components';
import classNames from "classnames";
import theme from "../../style/theme";
import TurbineLogo from "../icon/TurbineLogo";

interface Props {
    className?: string;
}

const MainHeader: React.FC<Props> = props => {
    return (
        <header className={classNames('main_header', props.className)}>
            <div className={'logo_area'}>
                <TurbineLogo/>
            </div>
            <h1 className={'app_title'}>Turbine</h1>
        </header>
    )
}

export const StyledMainHeader = styled(MainHeader)`
text-rendering: optimizeLegibility;
display: flex;
flex-direction: row;
align-content: center;
width: 100%;
height: 60px;
background-color: #292929;
border-bottom: 1px solid #212121;
min-width: 1000px;
.logo_area {
padding: 7px;
margin-left: 3px;
}
h1 {
color: #ffffff;
padding: 3px;
width: min-content;
font-size: 24px;
font-style: normal;
font-weight: normal;
font-family: ${theme.font.title};
}
`;