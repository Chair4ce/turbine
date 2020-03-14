import React, {useEffect} from 'react';
import MaterialTable, {Column} from 'material-table';
import {useDispatch, useSelector} from "react-redux";
import {
    createNewSquadronTask,
    deleteSquadronTask,
    getSquadronTasks,
    updateNewSquadronTask
} from "../../store/squadronTasks/thunks";
import SquadronTask from "../../store/squadronTasks/SquadronTaskModel";
import {Autocomplete} from "@material-ui/lab";
import MemberOptionModel from "./MemberOptionModel";
import {TextField} from "@material-ui/core";
import {ApplicationState} from "../../store";
import NewSquadronTask from "../../store/squadronTasks/NewSquadronTask";
import {getMembers} from "../../store/members/thunks";
import {getSquadrons} from "../../store/squadrons/thunks";
import {getGainingMembers} from "../../store/gaining/thunks";
import SquadronTaskDisplay from "../../store/squadronTasks/SquadronTaskDisplay";


interface Row {
    id: number;
    mbrId: string;
    mbrName: string;
    taskType: string;
    status: string;
    dueDate: Date;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    items: SquadronTaskDisplay[];
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
    const memberOptions: MemberOptionModel[] = useSelector(({members}: ApplicationState) => members.data.map((function(member) {
        return new MemberOptionModel(member.sqid,member.fullName)
    })));
    const [assignedMemberSqid, updateAssignedMemberSqid] = React.useState("");
    const [assignedMemberName, updateAssignedMemberName] = React.useState("");

    function handleChange(event: any, values: any) {
console.log(values);

        if(values.Name !== null) {
        updateAssignedMemberSqid(values.sqid);
        updateAssignedMemberName(values.Name);
        }
        // this.setState({
        //     tags: values
        // }, () => {
        //     // This will output an array of objects
        //     // given by Autocompelte options property.
        //     console.log(state.tags);
        // });
    }

    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Assigned', field: 'mbrId',
                editComponent: props => (
                    <Autocomplete
                        id="combo-box"
                        options={memberOptions}
                        getOptionLabel={(option: MemberOptionModel) => option.Name}
                        style={{ width: 400 }}
                        onChange={handleChange}
                        renderInput={params => <TextField
                            {...params}
                            label="Select Member"
                            variant="outlined"
                            style={{ width: 400 }}
                            value={props.value}
                        />}
                    />
                )
            },
            {title: 'type', field: 'taskType'},
            {title: 'status', field: 'status', lookup: { 34: 'pending', 63: 'complete', 72: 'returned' },},
            {title: 'dueDate', field: 'dueDate', type: "date"},
        ],
        //rowData => <img src={rowData.id} style={{width: 50, borderRadius: '50%'}}/>
        // {
        //     title: 'Birth Place',
        //     field: 'birthCity',
        //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
        data: props.items,
    });
    useEffect(() => {
        dispatch(getSquadronTasks());
    }, [state]);


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
                        newData.mbrId = assignedMemberSqid;
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return {...prevState, data};
                            });
                            console.log(newData);
                            const newSquadronTask = new NewSquadronTask(
                                newData.mbrId,
                                newData.taskType,
                                newData.status,
                                newData.dueDate
                            );
                            dispatch(createNewSquadronTask(newSquadronTask));
                        }, 300);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        newData.mbrId = assignedMemberSqid;
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return {...prevState, data};
                                });
                                const newSquadronTaskData = new SquadronTask(
                                    newData.id,
                                    newData.mbrId,
                                    newData.taskType,
                                    newData.status,
                                    newData.dueDate
                                );
                                console.log(newSquadronTaskData);
                                dispatch(updateNewSquadronTask(newSquadronTaskData));
                            }
                        }, 300);
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
                            console.log("Deleting: " + oldData.id + ", with id: " + oldData.mbrId);
                            dispatch(deleteSquadronTask(oldData.id));
                        }, 300);
                    }),

            } : {}}


        />

    );
};

export default SquadronTaskTable;