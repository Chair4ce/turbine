import React from "react";
import {StyledAlphaPanel} from "./AlphaPanel";
import styled from "styled-components";
import classNames from "classnames";

interface Props {
    className?: string;
}
const MainPanels: React.FC<Props> = props => {
    return (
        <section className={classNames('panels', props.className)}>
            <div className={'table'}>
                <StyledAlphaPanel/>
            </div>
        </section>
    )
}

export const StyledMainPanels = styled(MainPanels)`
position: relative;
display: block;
height: 100%;
.table {
position: relative;
padding: 12px 4px 12px 12px;
height: 100%;
}

`;