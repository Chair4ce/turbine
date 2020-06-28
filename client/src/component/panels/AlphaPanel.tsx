import * as React from "react";
import classNames from "classnames";
import styled from "styled-components";
import theme from "../../style/theme";
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    className?: string;
}

const AlphaPanel: React.FC<Props> = props => {
    return (
        <div className={classNames('panel', props.className)}>
            <div className={classNames('container')}>
                <div className={classNames('header')}>
                    <div className={classNames('header-title-area')}>
                        <h2>Current Alpha Roster</h2>
                    </div>
                    <div className={'header_action_area'}>
                    <CloseIcon/>
                    </div>
                </div>
                <div className={classNames('column-header')}>
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
            </div>
        </div>
    )
}

export const StyledAlphaPanel = styled(AlphaPanel)`

display: block;
width: 624px;
position: relative;
height: 900px;
min-width: 375px;
float: left;
overflow: hidden;
font: inherit;
font-size: 100%;
vertical-align: baseline;
    
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
.header {
    display: flex;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 1;
    padding: 0 10px 0 15px;
    margin: 0;
    border: 0;
    height: 39px;
    
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
.column-header {
  padding: 0;
  display: flex;
  position: relative;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  height: 22px;
  background: #575757;
  
.column-title {
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 1;
}
  
.column-title-grade {
  margin-left: 10px;
  width: 30px;
}
.column-title-name {
  width: 230px;
}
.column-title-afsc {
  width: 80px;
}
.column-title-dor {
  width: 80px;
}
.column-title-dos {
  width: 80px;
}
}
`;