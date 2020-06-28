import React from 'react';
import {StyledMainHeader} from "../../component/appHeader/AppHeader";
import classNames from "classnames";
import styled from "styled-components";
import {StyledMainSection} from "./MainSection";

interface Props {
    className?: string;
}

const MainDashboard: React.FC<Props> = props => {
    return (
        <div className={classNames('main_dashboard', props.className)}>
            <div className={classNames('main_header', props.className)}>
                <div className={'main_header_container'}>
                    <StyledMainHeader/>
                </div>
            </div>
            <StyledMainSection/>
        </div>
    );
};

export const StyledMainDashboard = styled(MainDashboard)`
.main_header {
height: 60px;
}

.main_header_container {
min-width: 973px;
}

.main_section {
position: absolute;
width: 100%;
display: flex;
flex-direction: row;
top: 61px;
overflow: hidden;
    left: 0;
    right: 0;
    bottom: 0;
}

.sidebar_area {
position: relative;
height: 100%;
}

.main {
position: relative;
width: 100%;
}


`;






