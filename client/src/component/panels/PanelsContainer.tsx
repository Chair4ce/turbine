import React, {useEffect} from "react";

import styled from "styled-components";
import classNames from "classnames";
import {StyledCurrentRosterPanel} from "./CurrentRosterPanel";
import {StyledGainingRosterPanel} from "./GainingRosterPanel";
import {StyledLosingRosterPanel} from "./LosingRosterPanel";
import theme from "../../style/theme";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {getMembers} from "../../store/members/thunks";
import GenericAFSCCollection from "../../store/members/GenericGroupCollectionModel";
import MemberModel from "../../store/members/MemberModel";
import GenericGroupCollection from "../../store/members/GenericGroupCollectionModel";

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
    const members = useSelector(({members}: ApplicationState) => MemberModel.filterEnlistedOnly(members.data));
    const loading = useSelector(({members}: ApplicationState) => members.loading);
    const genericAFSCs = [...new Set(members.map(item => item.dafsc ? item.dafsc.substring(0, 3) + "X" + item.dafsc.substring(4) : ""))]
    const workcenters = [...new Set(members.map(item => item.officeSymbol ? item.officeSymbol : ""))]
    const membersOfGAfscs: GenericGroupCollection[] = genericAFSCs.filter((m) => m.length > 0).map((afsc) => {
            return new GenericGroupCollection(afsc, MemberModel.membersMatchingGafsc(afsc, members))
    })
    const membersOfOffices: GenericGroupCollection[] = workcenters.map((office) => {
        return new GenericGroupCollection(office, MemberModel.membersMatchingOffice(office, members))
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);
    return (
        <section className={classNames('panels', props.className)}>
            <div className={'table'}>
                {props.showCurrentPanel &&
                <StyledCurrentRosterPanel data={members} uniqueAFSCList={membersOfGAfscs} membersOfOffices={membersOfOffices} loading={loading} callback={props.callback}/>}
                {props.showGainingPanel && <StyledGainingRosterPanel callback={props.callback}/>}
                {props.showLosingPanel && <StyledLosingRosterPanel callback={props.callback}/>}
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
height: 100%;
min-width: 500px;
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
}


.item {
display: flex;
width: 100%;
flex: 1 0 auto;
min-height: 65px;
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
background: #d06868;!important;
}

.SMS {
background: #a16ace;!important;
}

.TSG {
background: #69d0ca;!important; 
}

.SSG {
background: #75d569;!important;
}

.SRA {
background: #dbde6e;!important;
}

.A1C {
background: #d7b36c;!important;
}

.AMN {
background: #db845f; !important;
}

`;