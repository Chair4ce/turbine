import React from "react";

import styled from "styled-components";
import classNames from "classnames";
import {StyledCurrentRosterPanel} from "./CurrentRosterPanel";
import {StyledGainingRosterPanel} from "./GainingRosterPanel";
import {StyledLosingRosterPanel} from "./LosingRosterPanel";
import theme from "../../style/theme";
import {StyledProjectedRosterPanel} from "./ProjectedRosterPanel";
import {StyledPositionPanel} from "./PositionPanel";

interface Props {
    showCurrentPanel?: boolean;
    showProjectedPanel?: boolean;
    showGainingPanel?: boolean;
    showLosingPanel?: boolean;
    showPositionPanel?: boolean;
    callback: (type: string) => void;
    className?: string;
}

const PanelsContainer: React.FC<Props> = props => {

    return (
        <section className={classNames('panels', props.className)}>
            <div className={'table'}>
                {props.showCurrentPanel && <StyledCurrentRosterPanel callback={props.callback}/>}
                {props.showGainingPanel && <StyledGainingRosterPanel callback={props.callback}/>}
                {props.showLosingPanel && <StyledLosingRosterPanel callback={props.callback}/>}
                {props.showProjectedPanel && <StyledProjectedRosterPanel callback={props.callback}/>}
                {props.showPositionPanel && <StyledPositionPanel callback={props.callback}/>}
            </div>
        </section>
    )
}

export const StyledPanelsContainer = styled(PanelsContainer)`
position: relative;
display: block;
width: 100%;
height: 100%;
//overflow-x: auto;
//overflow-y: hidden;
//overscroll-behavior-x: contain;

.container {
    //-ms-flex-direction: column;
    //flex-direction: column;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height: 100%;
}

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
width: 100%;
height: calc(100% - 1px);
min-width: 240px;
float: left;
font: inherit;
font-size: 100%;
vertical-align: baseline;
}

.panel_header {
    display: flex;
    min-width: 230px;
    width: 100%;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 1;
    margin: 0;
    border: 0;
    min-height: ${theme.header_heights.panel};
    padding: 0 3px 0 10px;
    background: rgb(44, 45, 47);;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-sizing: border-box;
    line-height: 15px;
}

.panel_header_title_area {
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 1;
}
.panel_header_action_area_upload {
height: 32px;
    -webkit-transition: background-color 100ms ease-in;
    -moz-transition: background-color 100ms ease-in;
    -o-transition: background-color 100ms ease-in;
    transition: background-color 100ms ease-in;
  :hover {
  background-color: rgba(119,119,119,0.27);
  }
}

.panel_header_action_area_close {
    margin-left: 5px;
height: 32px;
border-radius: 4px;
    -webkit-transition: background-color 100ms ease-in;
    -moz-transition: background-color 100ms ease-in;
    -o-transition: background-color 100ms ease-in;
    transition: background-color 100ms ease-in;
  :hover {
  background-color: rgba(119,119,119,0.27);
  }
}
.action_area {
display: flex;
align-items: center;
margin-left: auto;
flex-shrink: 0;
cursor: pointer;
}

.close_btn {
display: flex;
align-items: center;
justify-content: center;
background-color: transparent;
border: none;
outline: none;
cursor: pointer;
height: 32px;
width: 32px;
}

.moreDots {
width: 10px;
}

.upload_btn {
display: flex;
align-items: center;
justify-content: center;
background-color: transparent;
color: white;
border: none;
outline: none;
cursor: pointer;
height: 34px;
width: 90px;
padding: 0;
border-radius: 4px;
-webkit-transition: background-color 100ms ease-in;
-moz-transition: background-color 100ms ease-in;
-o-transition: background-color 100ms ease-in;
transition: background-color 100ms ease-in;
 :hover {
  background-color: rgb(255,133,36);
 }
}

.panel_content {
//background-color: #f4f4f4 ;
}

.content_container {
position: absolute;
width: 100%;
//overflow: hidden;
//overflow-x: auto;
height: calc(100vh - 122px);
height: 100%;
}


.item {
display: flex;
width: 100%;
flex: 1 0 auto;
height: ${theme.item_height.normal};
align-items: center;
border-bottom: 1px solid #ddd;
color: #333333;
:hover{
background-color: rgb(255,255,255);
}
}
.end_of_list {
    position: relative;
    width: 100%;
    min-height: ${theme.header_heights.panel};
    background-color: #484f57;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
} 



  h2 {
    font-family: ${theme.font.tableHeader};
    font-style: normal;
    font-weight: normal;
    line-height: 15px;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
    font-size: 16px;
  }
  h4 {
   font-family: ${theme.font.tableHeader};
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 15px;
    margin-top: 0;
    margin-bottom: 0;
  }
  
  .CMS {
background: #D9AAAA;!important;
}

.SMS {
background: #C4AAD9;!important;
}

.TSG {
background: #AAD9D6;!important;
}

.SSG {
background: #B0D9AA;!important;
}

.SRA {
background: #D8D9AA;!important;
}

.A1C {
background: #D9CCAA;!important;
}

.AMN {
background: #D9B8AA; !important;
}

`;