import React from 'react';
import MaterialTable, {Column} from 'material-table';
import GainingModel from "../../store/gaining/GainingModel";
import moment from "moment";

interface Row {
    id: number;
    fullName: string;
    grade: string;
    dafsc: string;
    rnltd: Date | null;
    projectedArrivalDate: Date | null;
    projectedBilletId: string | null;
    dateDepLastDutyStn: Date | null;
    losingPas: string | null
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    gaining: GainingModel[];
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

const GainingTable: React.FC<Props> = props => {
    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Name', field: 'fullName'},
            {title: 'Rank', field: 'grade'},
            {title: 'DAFSC', field: 'dafsc'},
            {title: 'RNLTD', field: 'rnltd', type: 'date'},
            {title: 'Projected_Arrival', field: 'projectedArrivalDate', type: 'date'},
            {title: 'Projected_Billet', field: 'projectedBilletId'},
            {title: 'Departed_Stn', field: 'dateDepLastDutyStn', type: 'date'},
            {title: 'losing PAS', field: 'losingPas'},

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
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return {...prevState, data};
                            });
                        }, 300);
                    }),
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

    );
};

export default GainingTable;


