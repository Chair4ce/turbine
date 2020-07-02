import * as React from "react";
import {StyledSideBar} from "../../component/sidebar/SideBar";
import {StyledPanelsContainer} from "../../component/panels/PanelsContainer";
import styled from "styled-components";
import {useState} from "react";
import {ROSTER_MENU_SELECT_ACTION} from "../../component/menus/RosterMenu";
// @ts-ignore
import readXlsxFile from "read-excel-file";

interface Props {
    className?: string;
}

const schema = {
    'FULL_NAME': {
        prop: 'name',
        type: String
        // Excel stores dates as integers.
        // E.g. '24/03/2018' === 43183.
        // Such dates are parsed to UTC+0 timezone with time 12:00 .
    },
    'SSAN': {
        prop: 'ssn',
        type: String,
        required: false
    },
    // 'COURSE' is not a real Excel file column name,
    // it can be any string — it's just for code readability.
}






const MainSection: React.FC<Props> = props => {
    const [showCurrentPanel, toggleCurrentPanel] = useState(false);
    const [showProjectedPanel, toggleProjectedPanel] = useState(false);
    const [showGainingPanel, toggleGainingPanel] = useState(false);
    const [showLosingPanel, toggleLosingPanel] = useState(false);




    const menuSelectHandler = (type: string) => {
        switch(type) {
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


    function handleFile(e: any) {

        const input = document.getElementById('input')! as HTMLInputElement;
        if (input.files) {
            console.log("found file")
            // const fileJSON: JSON = readXlsxFile(input.files, {schema}).then((rows: any, errors: any) => {
            //     // `errors` have shape `{ row, column, error, value }`.
            //     // console.log(rows);
            //     return rows;
            // })
            // console.log(fileJSON);
            readXlsxFile(input.files[0]).then((rows: any) => {
                // console.log('row: ' + rows)
console.log(rows);
                // `rows` is an array of rows
                // each row being an array of cells.
            })}
            return function (p1: React.ChangeEvent<HTMLInputElement>) {

            };
        }
 

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
                    <input type="file" id="input" onChange={(e) => {
                        const {target} = e;
                        if (target.value.length > 0) {
                            handleFile(e)
                        } else {
                        }
                    }}/>
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