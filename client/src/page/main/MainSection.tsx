import * as React from "react";
import {useState} from "react";
import {StyledSideBar} from "../../component/sidebar/SideBar";
import {StyledPanelsContainer} from "../../component/panels/PanelsContainer";
import styled from "styled-components";
import {ROSTER_MENU_SELECT_ACTION} from "../../component/menus/RosterMenu";
// @ts-ignore
// import readXlsxFile from "read-excel-file";

interface Props {
    className?: string;
}

// const schema = {
//     'FULL_NAME': {
//         prop: 'fullName',
//         type: String,
//         required: true
//         // Excel stores dates as integers.
//         // E.g. '24/03/2018' === 43183.
//         // Such dates are parsed to UTC+0 timezone with time 12:00 .
//     },
//     'GRADE': {
//         prop: 'grade',
//         type: String,
//         required: false
//     },
//     'ASSIGNED_PAS': {
//         prop: 'assignedPas',
//         type: String,
//         required: false
//     },
//     'OFFICE_SYMBOL': {
//         prop: 'officeSymbol',
//         type: String,
//         required: false
//     },
//     'DUTY_TITLE': {
//         prop: 'dutyTitle',
//         type: String,
//         required: false
//     },
//     'DUTY_START_DATE': {
//         prop: 'dutyStartDate',
//         type: Date,
//         required: false
//     },
//     'DOR': {
//         prop: 'dor',
//         type: Date,
//         required: false
//     },
//     'DAFSC': {
//         prop: 'dafsc',
//         type: String,
//         required: false
//     },
//     'PAFSC': {
//         prop: 'pafsc',
//         type: String,
//         required: false
//     },
//     'DATE_ARRIVED_STATION': {
//         prop: 'dateArrivedStation',
//         type: Date,
//         required: false
//     },
//     'DOS': {
//         prop: 'dos',
//         type: Date,
//         required: false
//     },
//     'RNLTD': {
//         prop: 'rnltd',
//         type: Date,
//         required: false
//     },
//     'SUPV_NAME': {
//         prop: 'supvName',
//         type: String,
//         required: false
//     },
//     'SUPV_BEGIN_DATE': {
//         prop: 'supvBeginDate',
//         type: Date,
//         required: false
//     },
//     'DEROS': {
//         prop: 'deros',
//         type: Date,
//         required: false
//     }
//
//     // 'COURSE' is not a real Excel file column name,
//     // it can be any string — it's just for code readability.
// }


const MainSection: React.FC<Props> = props => {
    const [showCurrentPanel, toggleCurrentPanel] = useState(false);
    const [showProjectedPanel, toggleProjectedPanel] = useState(false);
    const [showGainingPanel, toggleGainingPanel] = useState(false);
    const [showLosingPanel, toggleLosingPanel] = useState(false);
    // const [fileData, updateFileData] = useState();
    const menuSelectHandler = (type: string) => {
        switch (type) {
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_CURRENT_ROSTER:
                toggleCurrentPanel(prev => !prev)
                break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_PROJECTED_ROSTER:
                toggleProjectedPanel(prev => !prev)
                break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_GAINING_ROSTER:
                toggleGainingPanel(prev => !prev)
                break;
            case ROSTER_MENU_SELECT_ACTION.TOGGLE_LOSING_ROSTER:
                toggleLosingPanel(prev => !prev)
                break;
        }
    }


    // function handleFile(e: HTMLInputElement) {
    //     if (e.files) {
    //         const data = readXlsxFile(e.files[0], {schema, transformData(data: any) {
    //             return data.splice(2, data.length - 3)}}).then(((rows: any, errors: any) => {
    //                 updateFileData(rows.rows);
    //             console.log(rows.rows);
    //         }));
    //
    //     }
    // }

    return (
        <section className={'main_section'}>
            <div className={'sidebar_area'}>
                <StyledSideBar
                    showCurrentPanel={showCurrentPanel}
                    showProjectedPanel={showProjectedPanel}
                    showGainingPanel={showGainingPanel}
                    showLosingPanel={showLosingPanel}
                    menu_item_select_callback={menuSelectHandler}
                />
            </div>
            <article className={'main'}>
                {/*<input type="file" id="input" onChange={(e) => {*/}
                {/*    const {target} = e;*/}
                {/*    if (target.value.length > 0) {*/}
                {/*        handleFile(e.target)*/}
                {/*    }*/}
                {/*}}/>*/}
                {/*{fileData ? fileData.map((row: any) => {*/}
                {/*return row.fullName}) : ''*/}
                {/*}*/}
                <StyledPanelsContainer
                    showCurrentPanel={showCurrentPanel}
                    showProjectedPanel={showProjectedPanel}
                    showGainingPanel={showGainingPanel}
                    showLosingPanel={showLosingPanel}
                    callback={menuSelectHandler}
                />
            </article>
        </section>
    );
};


export const StyledMainSection = styled(MainSection)`
width: 100%;
.sidebar_area {
position: relative;
height: 100%;
}

.main {
position: relative;
width: 100%;
height: 100%;
}


`;