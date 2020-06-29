import * as React from "react";
import {ROSTER_MENU_SELECT_ACTION} from "../menus/RosterMenu";
import classNames from "classnames";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import theme from "../../style/theme";

interface Props {
    callback: (type: string) => void;
    className?: string;
}

const LosingRosterPanel: React.FC<Props> = props => {

    const handleClose = () => {
        props.callback(ROSTER_MENU_SELECT_ACTION.TOGGLE_LOSING_ROSTER)
    }
    return (
        <div className={classNames('panel', props.className)}>
            <div className={classNames('container')}>
                <header className={classNames('panel_header')}>
                    <div className={classNames('header-title-area')}>
                        <h2>Losing Roster</h2>
                    </div>
                    <div className={'header_action_area'}>
                        <button className={'close_btn'} onClick={handleClose}>
                            <CloseIcon color={"action"}/>
                        </button>
                    </div>
                </header>
                <div className={classNames('content_header')}>
                    <div className={classNames('column-title', 'column-title-grade')}>
                        <h4>Grade</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-name')}>
                        <h4>Name</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-afsc')}>
                        <h4>AFSC</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-dor')}>
                        <h4>DOR</h4>
                    </div>
                    <div className={classNames('column-title', 'column-title-dos')}>
                        <h4>DOS</h4>
                    </div>
                </div>
                <section className={classNames('panel_content')}>
                    <div className={'items_container'}>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                        <div className={'item'}/>
                    </div>
                <div className={classNames('end_of_list', 'preview')}/>
                </section>
            </div>
        </div>
    )
}

export const StyledLosingRosterPanel = styled(LosingRosterPanel)`



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

.close_btn {
display: flex;
align-items: center;
justify-content: center;
background-color: transparent;
border: none;
outline: none;
cursor: pointer;
height: 24px;
width: 24px;
}

.panel_content {
display: block;
position: relative;
width: 100%;
flex-grow: 1;
overflow-y: auto;
}

.item {
height: ${theme.item_height.normal};
width: 100%;
background-color: #ffe3e3;
border-bottom: 1px solid #ddd;
}

.end_of_list {
    min-height: ${theme.header_heights.panel};
    background-color: #484f57;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.container {
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height: 100%;
}
.panel_header {
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 1;
    padding: 0 7px 0 10px;
    margin: 0;
    border: 0;
    min-height: ${theme.header_heights.panel};
    
    background: rgb(44, 45, 47);;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-sizing: border-box;
    line-height: 15px;
}

.header-title-area {
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 1;
}

.header_action_area {
margin-left: auto;
flex-shrink: 0;
cursor: pointer;
height: 24px;
    -webkit-transition: background-color 100ms ease-in;
    -moz-transition: background-color 100ms ease-in;
    -o-transition: background-color 100ms ease-in;
    transition: background-color 100ms ease-in;
  :hover {
  background-color: rgba(119,119,119,0.27);
  }
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
    line-height: 15px;
    white-space: nowrap;
    margin-top: 0;
    margin-bottom: 0;
  }
.content_header {
  padding: 0;
  display: flex;
  position: relative;
  align-content: center;
  justify-content: space-between;
  min-height: ${theme.header_heights.content};
  background: #575757;
  
.column-title {
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 1;
}
  
.column-title-grade {
  margin-left: 10px;
  min-width: 43px;
  max-width: 60px;
}
.column-title-name {
  min-width: 100px;
    max-width: 360px;
}
.column-title-afsc {
  min-width: 80px;
    max-width: 100px;
}
.column-title-dor {
  min-width: 80px;
    max-width: 100px;
}
.column-title-dos {
  min-width: 80px;
    max-width: 100px;
}
}
`;