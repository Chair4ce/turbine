import React from 'react';
import MaterialTable, {Column} from 'material-table';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import StagingUploadPositionModel from "../../store/positions/models/StagingUploadPositionModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            zIndex: 4000
        },
        fileDropArea: {
            height: 50,
            width: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed white',
        },
        uploadBtn: {
            marginBottom: 10,
            position: 'fixed',
            bottom: 0,
            left: '10px',
            width: 'calc(100vw - 20px)',
        },

    }),
);

interface Row {
     id: number;
     pasCode: string;
     orgStructureId: string | null;
     afscAuth: string | null;
     grdAuth: string | null;
     currQtr: string | null;
     projQtr1: string | null;
     projQtr2: string | null;
     projQtr3: string | null;
     projQtr4: string | null;
     posNr: string | null;
     gradeAssigned: string | null;
     dafscAssigned: string | null;
     nameAssigned: string | null;
     mbrIdAssigned: string | null;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    upload: StagingUploadPositionModel[];
    callback: (data?: any[]) => void;
    loading: boolean;
    title: string;
    filtering: boolean,
    edit: boolean,
    grouping: boolean,
    search: boolean,
    selection: boolean,
    exportButton: boolean,
    className?: string;
}

export const UpmrReviewTable: React.FC<Props> = props => {

    const classes = useStyles();

    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Pos Nr', field: 'posNr'},
            {title: 'Grade Auth', field: 'grdAuth'},
            {title: 'AFSC Auth', field: 'afscAuth'},
            {title: 'Org Struct Id', field: 'orgStructureId'},
            {title: 'Curr Qtr', field: 'currQtr'},
            {title: 'Proj Qtr 1', field: 'projQtr1'},
            {title: 'Proj Qtr 2', field: 'projQtr2'},
            {title: 'Proj Qtr 3', field: 'projQtr3'},
            {title: 'Proj Qtr 4', field: 'projQtr4'},
            {title: 'Grade Asgn', field: 'gradeAssigned'},
            {title: 'afsc Asgn', field: 'dafscAssigned'},
            {title: 'Name Asgn', field: 'nameAssigned'},
            {title: 'mbrId', field: 'mbrIdAssigned'}

            //rowData => <img src={rowData.id} style={{width: 50, borderRadius: '50%'}}/>
            // {
            //     title: 'Birth Place',
            //     field: 'birthCity',
            //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
        ],
        data: props.upload,
    });

    function handleUpload() {
        props.callback(state.data)
    }


    // const timer = React.useRef<number>();

    return (
        <div>


            <MaterialTable
                style={{maxWidth: "unset"}}
                title={props.title}
                columns={state.columns}
                data={state.data}
                isLoading={props.loading}
                actions={[
                    // {
                    //     tooltip: 'Remove All Selected Users',
                    //     icon: 'delete',
                    //     onClick: (evt, data) => alert('You want to delete ' + state.data.length + ' rows')
                    // }
                ]}
                // detailPanel={[
                //     {
                //         tooltip: 'Show Tasks',
                //         render: rowData => {
                //             return (
                //                 <div
                //                     style={{
                //                         fontSize: 100,
                //                         textAlign: 'center',
                //                         color: 'black',
                //                         backgroundColor: '#8d8891',
                //                     }}
                //                 >
                //                     {rowData.supvName}
                //                 </div>
                //             )
                //         },
                //     },
                //     // {
                //     //     icon: 'account_circle',
                //     //     tooltip: 'Show Members Details',
                //     //     render: rowData => {
                //     //         return (
                //     //             <div
                //     //                 style={{
                //     //                     fontSize: 100,
                //     //                     textAlign: 'center',
                //     //                     color: 'white',
                //     //                     backgroundColor: '#E53935',
                //     //                 }}
                //     //             >
                //     //                 {rowData.dutyTitle}
                //     //             </div>
                //     //         )
                //     //     },
                //     // },
                // ]}
                options={{
                    filtering: props.filtering,
                    grouping: props.grouping,
                    search: props.search,
                    selection: props.selection,
                    exportButton: props.exportButton,
                    pageSizeOptions: [5,10,50,100],
                    columnsButton: true,
                    emptyRowsWhenPaging: false,
                    padding: "dense",
                    // detailPanelColumnAlignment: "left",
                    // selectionProps: (rowData: Member) => ({
                    //     disabled: rowData.fullName === 'ABRAMS, JOSEPH L',
                    //     color: 'primary'
                    // })
                }}
                editable={props.edit ? {
                    // onRowAdd: newData =>
                    //     new Promise(resolve => {
                    //         setTimeout(() => {
                    //             resolve();
                    //             setState(prevState => {
                    //                 const data = [...prevState.data];
                    //                 data.push(newData);
                    //                 return {...prevState, data};
                    //             });
                    //         }, 300);
                    //     }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {

                                if (oldData) {
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return {...prevState, data};
                                    });
                                }

                            }, 300);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {

                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return {...prevState, data};
                                });
                            }, 300);
                        }),
                } : {}}


            />
            <Button
                onClick={handleUpload}
                variant="contained"
                color="default"
                className={classes.uploadBtn}
                startIcon={<CloudUploadIcon/>}
            >
                Save
            </Button>
        </div>

    );
};

const mapStateToProps = ({positions}: ApplicationState) => ({
    upload: positions.uploadStagingPosition,
})
const mapDispatchToProps = {
}

export const UpmrReviewTableConnected = connect(mapStateToProps, mapDispatchToProps)(UpmrReviewTable);
