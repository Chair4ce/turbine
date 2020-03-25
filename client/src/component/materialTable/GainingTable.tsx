import React from 'react';
import MaterialTable, {Column} from 'material-table';
import GainingModel from "../../store/gaining/GainingModel";
import {useDispatch, useSelector} from "react-redux";
import {deleteGaining, getGainingMembers, updateGaining} from "../../store/gaining/thunks";
import {ApplicationState} from "../../store";
import moment from "moment";
import MemberOptionModel from "./MemberOptionModel";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

interface Row {
     id: number;
     sqid: string;
     fullName: string;
     firstName: string;
     lastName: string;
     rnltd: Date | undefined;
     grade: string;
     gainingPas: string;
     projectedArrivalDate: Date | undefined;
     dafsc: string;
     cellPhone: string | undefined;
     email: string | undefined;
     dor: Date | undefined;
     dateArrivedStation: Date | undefined;
     projectedBilletId: string | undefined;
     dateDepLastDutyStn: Date | undefined;
     sponsorId: string | undefined;
     losingPas: string | undefined;
     projectedOfficeSymbol: string | undefined;
     lastUpdated: Date | undefined;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    title: string;
    filtering: boolean,
    edit: boolean,
    grouping: boolean,
    search: boolean,
    selection: boolean,
    exportButton: boolean,
    className?: string;
}

const GainingTable: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const gainingMembers = useSelector(({gaining}: ApplicationState) => gaining.data);
    const gainingLoading = useSelector(({gaining}: ApplicationState) => gaining.loading);
    const memberOptions: MemberOptionModel[] = useSelector(({members}: ApplicationState) => members.data.map((function (member) {
        return new MemberOptionModel(member.sqid, member.fullName)
    })));

    const [assignedSponsorSqid, updateAssignedSponsorSqid] = React.useState("");

    function handleChange(event: any, values: any) {
        if (event) {
            if (values.Name === "" || values.Name !== undefined || !values) updateAssignedSponsorSqid(values.Name);
        }
    }

    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Name', field: 'fullName', editable: 'never'},
            {title: 'Rank', field: 'grade', editable: 'never'},
            {title: 'DAFSC', field: 'dafsc', editable: 'never'},
            {title: 'RNLTD', field: 'rnltd', type: 'date', editable: 'never'},
            {title: 'Projected_Arrival', field: 'projectedArrivalDate', type: 'date'},
            {title: 'Projected_Billet', field: 'projectedBilletId'},
            {title: 'Sponsor', field: 'sponsorId',
                editComponent: props => (
                    <Autocomplete
                        id="combo-box"
                        options={memberOptions}
                        getOptionLabel={(option: MemberOptionModel) => option.Name}
                        style={{width: 400}}
                        onChange={handleChange}
                        disableClearable
                        renderInput={params => <TextField
                            {...params}
                            label="Select Member"
                            variant="outlined"
                            style={{width: 400}}
                            value={props.rowData.sponsorId ? props.rowData.sponsorId : '' }
                            placeholder={props.rowData.sponsorId}
                        />}
                    />
                )},
            {title: 'Departed_Stn', field: 'dateDepLastDutyStn', type: 'date'},
            {title: 'losing PAS', field: 'losingPas', editable: 'never'},

            //rowData => <img src={rowData.id} style={{width: 50, borderRadius: '50%'}}/>
            // {
            //     title: 'Birth Place',
            //     field: 'birthCity',
            //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
        ],
        data: [],
    });

    // const timer = React.useRef<number>();

    return (
        <MaterialTable
            title={props.title}
            columns={state.columns}
            data={gainingMembers}
            isLoading={gainingLoading}
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
                                {rowData.rnltd ? "Arriving in: " + moment(rowData.rnltd).format("MMM YY") : null}
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
                pageSizeOptions: [5, 10, 50, 100],
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
                //         }, 300);
                //     }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        if (oldData){
                            if (assignedSponsorSqid !== "") newData.sponsorId = assignedSponsorSqid;
                        const newGainingData = new GainingModel(
                            newData.id,
                            newData.sqid,
                            newData.fullName,
                            newData.firstName,
                            newData.lastName,
                            newData.rnltd,
                            newData.grade,
                            newData.gainingPas,
                            newData.projectedArrivalDate,
                            newData.dafsc,
                            newData.cellPhone,
                            newData.email,
                            newData.dor,
                            newData.dateArrivedStation,
                            newData.projectedBilletId,
                            newData.dateDepLastDutyStn,
                            newData.sponsorId,
                            newData.losingPas,
                            newData.projectedOfficeSymbol,
                            newData.lastUpdated);
                        dispatch(updateGaining(newGainingData));
                            setTimeout(() => {
                                dispatch(getGainingMembers());
                                resolve();
                            }, 300);
                        }
                        resolve();
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        dispatch(deleteGaining(oldData.id));
                        setTimeout(() => {
                            dispatch(getGainingMembers());
                            resolve();
                        }, 300);
                    }),
            } : {}}


        />

    );
};

export default GainingTable;



