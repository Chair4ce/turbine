import React, {useEffect, useState} from 'react';
import MaterialTable, {Column} from 'material-table';
import StagingUploadMemberModel from "../../store/members/models/StagingUploadMemberModel";
import {connect, useDispatch} from "react-redux";
import {ApplicationState} from "../../store";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {stageMemberUploadData} from "../../store/members";
import {MemberSerializer} from "../../util/MemberSerializer";
import {Button} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
     ssan: string;
     fullName: string;
     grade: string | undefined;
     assignedPas: string| undefined;
     dafsc: string | undefined;
     officeSymbol: string | undefined;
     dutyTitle: string | undefined;
     dutyStartDate: string | undefined;
     dutyPhone: string | undefined;
     supvName: string | undefined;
     supvBeginDate: string | undefined;
     dateArrivedStation: string | undefined;
     rnltd: string | undefined;
     dor: string | undefined;
     deros: string | undefined;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    upload: StagingUploadMemberModel[];
    callback: (data?: StagingUploadMemberModel[]) => void;
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

export const AlphaReviewTable: React.FC<Props> = props => {

    const classes = useStyles();

    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Name', field: 'fullName'},
            {title: 'Rank', field: 'grade'},
            {title: 'DAFSC', field: 'dafsc'},
            {title: 'Office', field: 'officeSymbol'},
            {title: 'Duty Title', field: 'dutyTitle'},
            {title: 'Phone', field: 'dutyPhone'},
            {title: 'DOR', field: 'dor', type: "date"},
            {title: 'Supervisor', field: 'supvName'},
            {title: 'Supervisor Begin', field: 'supvBeginDate',type: "date"},
            {title: 'DEROS', field: 'deros', type: "date"}

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
                            resolve();
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
                            resolve();
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
                Upload
            </Button>
        </div>

    );
};

const mapStateToProps = ({members}: ApplicationState) => ({
    upload: members.upload,
})
const mapDispatchToProps = {
}

export const AlphaReviewTableConnected = connect(mapStateToProps, mapDispatchToProps)(AlphaReviewTable);

