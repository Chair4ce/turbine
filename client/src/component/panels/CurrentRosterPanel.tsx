import * as React from "react";
import classNames from "classnames";
import styled from "styled-components";
import theme from "../../style/theme";
import CloseIcon from '@material-ui/icons/Close';
import {ROSTER_MENU_SELECT_ACTION} from "../menus/RosterMenu";
import PublishIcon from '@material-ui/icons/Publish';

interface Props {
    callback: (type: string) => void;
    provided: any;
    className?: string;
}

const CurrentRosterPanel: React.FC<Props> = props => {

    const handleClose = () => {
        props.callback(ROSTER_MENU_SELECT_ACTION.TOGGLE_CURRENT_ROSTER)
    }
    return (
        <div className={classNames('container', props.className)}
             ref={props.provided.innerRef}>
            <header className={classNames('panel_header')}>
                <div className={classNames('header-title-area')}>
                    <h2>Alpha Roster</h2>
                </div>
                <div className={'action_area'}>
                    <button className={'upload_btn'} >
                        <PublishIcon color={"action"}/>
                        Upload
                    </button>
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
            {props.provided.placeholder}
        </div>
    )
}

export const StyledCurrentRosterPanel = styled(CurrentRosterPanel)`

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

//.MuiButton-root {
//    color: #CCCCCC;
//    padding: 6px 16px;
//    font-size: 0.875rem;
//    min-width: 64px;
//    box-sizing: border-box;
//    
//    font-family: open-sans;
//    font-weight: 500;
//    line-height: 1.75;
//    border-radius: 4px;
//    text-transform: uppercase;
//}
//.MuiButton-text {
//    padding: 6px 8px;
//}

.action_area {
display: block;
margin-left: auto;
flex-shrink: 0;
height: 34px;
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
-webkit-transition: background-color 100ms ease-in;
-moz-transition: background-color 100ms ease-in;
-o-transition: background-color 100ms ease-in;
transition: background-color 100ms ease-in;
 :hover {
  border-radius: 4px;
  background-color: rgb(255,133,36);
 }
}
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
background-color: #f4f4f4 ;
border-bottom: 1px solid #ddd;
}

.end_of_list {
    min-height: ${theme.header_heights.panel};
    background-color: #484f57;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
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
margin-left: 20px;
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