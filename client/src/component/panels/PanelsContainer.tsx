import React from "react";

import styled from "styled-components";
import classNames from "classnames";
import {StyledCurrentRosterPanel} from "./CurrentRosterPanel";
import {StyledProjectedRosterPanel} from "./ProjectedRosterPanel";
import {StyledGainingRosterPanel} from "./GainingRosterPanel";
import {StyledLosingRosterPanel} from "./LosingRosterPanel";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";

interface Props {
    showCurrentPanel?: boolean;
    showProjectedPanel?: boolean;
    showGainingPanel?: boolean;
    showLosingPanel?: boolean;
    callback: (type: string) => void;
    className?: string;
}

const PanelsContainer: React.FC<Props> = props => {
    function handleDrop(dropResult: DropResult) {
        console.log('Dropped');
    }

    return (
        <section className={classNames('panels', props.className)}>
            <div className={'table'}>
                <DragDropContext onDragEnd={handleDrop}>
                    {props.showCurrentPanel && <Droppable droppableId={'current_roster_panel'}>

                        {(provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef} className={'panel'}>
                                    <Draggable draggableId={'current'} index={1}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div     {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         ref={provided.innerRef}
                                                >
                                                    <StyledCurrentRosterPanel
                                                        callback={props.callback}
                                                        provided={provided}
                                                    />
                                                </div>

                                            )

                                        }}
                                    </Draggable>
                                    {provided.placeholder}
                                </div>
                            )
                        }}

                    </Droppable>
                    }

                    {props.showGainingPanel &&
                    <Droppable droppableId={'gaining_roster_panel'}>
                        {(provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef} className={'panel'}>
                                    <Draggable draggableId={'gaining'} index={1}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div     {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         ref={provided.innerRef}
                                                >
                                                    <StyledGainingRosterPanel
                                                        callback={props.callback}
                                                        provided={provided}
                                                    />
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                    {provided.placeholder}
                                </div>
                            )
                        }}

                    </Droppable>
                    }
                    {props.showLosingPanel &&
                    <Droppable droppableId={'losing_roster_panel'}>
                        {(provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef} className={'panel'}>
                                    <Draggable draggableId={'losing'} index={1}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div     {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         ref={provided.innerRef}
                                                >
                                                    <StyledLosingRosterPanel
                                                        callback={props.callback}
                                                        provided={provided}
                                                    />
                                                </div>

                                            )

                                        }}
                                    </Draggable>
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                    }
                    {props.showProjectedPanel &&
                    <Droppable droppableId={'projected_roster_panel'}>
                        {(provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef} className={'panel'}>
                                    <Draggable draggableId={'projected'} index={1}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div     {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         ref={provided.innerRef}
                                                >
                                                    <StyledProjectedRosterPanel
                                                        callback={props.callback}
                                                        provided={provided}
                                                    />
                                                </div>

                                            )

                                        }}
                                    </Draggable>
                                    {provided.placeholder}
                                </div>
                            )
                        }}

                    </Droppable>
                    }
                </DragDropContext>
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
margin-right: 10px;
display: block;
position: relative;
width: inherit;
height: calc(100% - 1px);
min-width: 275px;
float: left;
overflow: hidden;
font: inherit;
font-size: 100%;
vertical-align: baseline;
}

.panel_header {
cursor: move;
}

.item {
:hover{
background-color: rgb(255,255,255);
}
}

`;