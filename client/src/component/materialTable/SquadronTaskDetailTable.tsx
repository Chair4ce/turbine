import React from 'react';
import MaterialTable, {Column} from 'material-table';
import moment from "moment";
import {useDispatch} from "react-redux";
import SquadronTaskDetail from "../../store/squadronTasks/squadronTaskDetailModel";
import {deleteSquadronTask} from "../../store/squadronTasks/thunks";


interface Row {
    id: number;
    mbrId: string;
    mbrName: string;
    taskType: string;
    status: string;
    dueDate: Date;
    rnltd: Date;
    Supervisor: string;
    SupId: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    gaining: SquadronTaskDetail[];
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

const SquadronTaskTable: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Assigned', field: 'mbrName'},
            {title: 'type', field: 'taskType'},
            {title: 'status', field: 'status'},
            {title: 'dueDate', field: 'dueDate', type: "date"},
            {title: 'RNLTD', field: 'rnltd', type: "date"},
            {title: 'Supervisor', field: 'supervisor'}
            //rowData => <img src={rowData.id} style={{width: 50, borderRadius: '50%'}}/>
            // {
            //     title: 'Birth Place',
            //     field: 'birthCity',
            //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
        ],
        data: props.gaining,
    });



    // const timer = React.useRef<number>();

    return (
        <MaterialTable
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
            detailPanel={[
                {
                    tooltip: 'Show Tasks',
                    render: rowData => {
                        return (
                            <div
                                style={{
                                    fontSize: 100,
                                    textAlign: 'center',
                                    color: 'black',
                                    backgroundColor: '#8d8891',
                                }}
                            >
                                {rowData.rnltd ? "Arriving in: "+moment(rowData.rnltd).format("MMM YY") : null}
                            </div>
                        )
                    },
                },
                // {
                //     icon: 'account_circle',
                //     tooltip: 'Show Members Details',
                //     render: rowData => {
                //         return (
                //             <div
                //                 style={{
                //                     fontSize: 100,
                //                     textAlign: 'center',
                //                     color: 'white',
                //                     backgroundColor: '#E53935',
                //                 }}
                //             >
                //                 {rowData.dutyTitle}
                //             </div>
                //         )
                //     },
                // },
            ]}
            options={{
                filtering: props.filtering,
                grouping: props.grouping,
                search: props.search,
                selection: props.selection,
                exportButton: props.exportButton,
                pageSizeOptions: [5,10,50,100],
                columnsButton: true,
                emptyRowsWhenPaging: false,

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
                //
                //         }, 300);
                //     }),
                // onRowUpdate: (newData, oldData) =>
                //     new Promise(resolve => {
                //         setTimeout(() => {
                //             resolve();
                //             if (oldData) {
                //                 setState(prevState => {
                //                     const data = [...prevState.data];
                //                     data[data.indexOf(oldData)] = newData;
                //                     return {...prevState, data};
                //                 });
                //                 const newSquadronTaskData = new SquadronTaskDetail(
                //                     newData.id,
                //                     newData.mbrSqId,
                //                     newData.taskType,
                //                     newData.status,
                //                     newData.dueDate
                //                 );
                //                 console.log(newSquadronTaskData);
                //                 dispatch(updateNewSquadronTask(newSquadronTaskData));
                //             }
                //         }, 300);
                //     }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return {...prevState, data};
                            });
                            dispatch(deleteSquadronTask(oldData.id));
                        }, 300);
                    }),
            } : {}}


        />

    );
};

export default SquadronTaskTable;