import React from "react";

import styled from "styled-components";
import classNames from "classnames";
import {StyledCurrentRosterPanel} from "./CurrentRosterPanel";
import {StyledProjectedRosterPanel} from "./ProjectedRosterPanel";
import {StyledGainingRosterPanel} from "./GainingRosterPanel";
import {StyledLosingRosterPanel} from "./LosingRosterPanel";

interface Props {
    showCurrentPanel?: boolean;
    showProjectedPanel?: boolean;
    showGainingPanel?: boolean;
    showLosingPanel?: boolean;
    callback: (type: string) => void;
    className?: string;
}
const PanelsContainer: React.FC<Props> = props => {
    return (
        <section className={classNames('panels', props.className)}>
            <div className={'table'}>
                {props.showCurrentPanel && <StyledCurrentRosterPanel
                callback={props.callback}
                />}
                {props.showProjectedPanel && <StyledProjectedRosterPanel
                    callback={props.callback}/>}
                {props.showGainingPanel && <StyledGainingRosterPanel
                    callback={props.callback}/>}
                {props.showLosingPanel && <StyledLosingRosterPanel
                    callback={props.callback}/>}
            </div>
        </section>
    )
}

export const StyledPanelsContainer = styled(PanelsContainer)`
position: relative;
display: block;
width: 100%;
height: 100%;
overflow-x: auto;
overflow-y: hidden;
overscroll-behavior-x: contain;
.table {
width: 100%;
 position: relative;
 box-sizing: border-box;
 display: flex;
 padding: 12px 4px 12px 12px;
 height: 100%;
 vertical-align: baseline;
}

.panel {
min-width: 375px;
margin-right: 10px;
}

`;