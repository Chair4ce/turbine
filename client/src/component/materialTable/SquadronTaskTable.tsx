import React, {useEffect} from 'react';
import MaterialTable, {Column} from 'material-table';
import {useDispatch, useSelector} from "react-redux";
import {
    createNewSquadronTask,
    deleteSquadronTask,
    getSquadronTaskDetails,
    updateNewSquadronTask
} from "../../store/squadronTasks/thunks";
import SquadronTask from "../../store/squadronTasks/SquadronTaskModel";
import {Autocomplete} from "@material-ui/lab";
import MemberOptionModel from "./MemberOptionModel";
import {TextField} from "@material-ui/core";
import {ApplicationState} from "../../store";
import NewSquadronTask from "../../store/squadronTasks/NewSquadronTask";


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
    title: string;
    filtering: boolean;
    edit: boolean;
    grouping: boolean;
    search: boolean;
    selection: boolean;
    exportButton: boolean;
    className?: string;
}


const SquadronTaskTable: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const memberOptions: MemberOptionModel[] = useSelector(({members}: ApplicationState) => members.data.map((function(member) {
        return new MemberOptionModel(member.sqid,member.fullName)
    })));

    const squadronTaskDetails = useSelector(({squadronTask}: ApplicationState) => squadronTask.squadronTaskDetails);
    const squadronTasksLoading = useSelector(({squadronTask}: ApplicationState) => squadronTask.loading);

    const [assignedMemberSqid, updateAssignedMemberSqid] = React.useState("");
    const [assignedMemberName, updateAssignedMemberName] = React.useState("");

    useEffect(() => {
        dispatch(getSquadronTaskDetails());
    }, [dispatch]);

    function handleChange(event: any, values: any) {
        console.log(values);
        if (event) {
        if(values.sqid === "" || values.sqid !== null || !values) updateAssignedMemberSqid(values.sqid);

        }
    }

    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Assigned', field: 'mbrName',
                editComponent: props => (
                    <Autocomplete
                        id="combo-box"
                        options={memberOptions}
                        getOptionLabel={(option: MemberOptionModel) => option.Name}
                        style={{ width: 400 }}
                        onChange={handleChange}
                        disableClearable
                        renderInput={params => <TextField
                            {...params}
                            label="Select Member"
                            variant="outlined"
                            style={{ width: 400 }}
                            placeholder={props.rowData.mbrName}
                        />}
                    />
                )
            },
            {title: 'type', field: 'taskType', lookup: { 'Achievement': 'Achievement',  'Commendation': 'Commendation', 'MSM': 'MSM' }},
            {title: 'status', field: 'status', lookup: { 'pending': 'pending',  'returned': 'returned', 'complete': 'complete' }},
            {title: 'dueDate', field: 'dueDate', type: "date"},
        ],
        //rowData => <img src={rowData.id} style={{width: 50, borderRadius: '50%'}}/>
        // {
        //     title: 'Birth Place',
        //     field: 'birthCity',
        //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
        data: [],
    });


    // const timer = React.useRef<number>();

    return (
        <MaterialTable
            title={props.title}
            columns={state.columns}
            data={squadronTaskDetails}
            isLoading={squadronTasksLoading}

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

                // selectionProps: (rowData: Member) => ({
                //     disabled: rowData.fullName === 'ABRAMS, JOSEPH L',
                //     color: 'primary'
                // })
            }}
            editable={props.edit ? {
                onRowAdd: newData =>
                    new Promise(resolve => {
                      if (assignedMemberSqid !== null) {
                          newData.mbrId = assignedMemberSqid;
                      }
                        const newSquadronTask = new NewSquadronTask(
                            newData.mbrId,
                            newData.taskType,
                            newData.status,
                            newData.dueDate
                        );
                        dispatch(createNewSquadronTask(newSquadronTask));
                        setTimeout(() => {
                            resolve();
                            dispatch(getSquadronTaskDetails());
                        }, 1200);

                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        if (oldData) {
                            if (assignedMemberSqid !== "") newData.mbrId = assignedMemberSqid;
                            // setState(prevState => {
                            //     const data = [...prevState.data];
                            //     data[data.indexOf(oldData)] = newData;
                            //     return {...prevState, data};
                            // });
                            const newSquadronTaskData = new SquadronTask(
                                newData.id,
                                newData.mbrId,
                                newData.taskType,
                                newData.status,
                                newData.dueDate
                            );
                            dispatch(updateNewSquadronTask(newSquadronTaskData));
                        }
                        setTimeout(() => {
                            resolve();
                                dispatch(getSquadronTaskDetails());
                        }, 1200);
                    }),

                onRowDelete: oldData =>
                    new Promise(resolve => {
                        console.log(oldData);
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
