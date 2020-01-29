import React from 'react';
import MaterialTable, { Column } from 'material-table';
import MemberModel from "../../store/members/MemberModel";
import {Box} from "@material-ui/core";

interface Row {
     id: number;
     full_name: string;
     grade: string;
     assigned_pas: string;
     dafsc: string;
     office_symbol: string;
     duty_title: string;
     duty_start_date: string;
     duty_phone: string;
     awardec_status: string;
     epr_opr_status: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    members: MemberModel[];
}


const EditMemberTable: React.FC<Props> = props => {
    const [state, setState] = React.useState<TableState>({

        columns: [
            { title: 'Name', field: 'full_name' },
            { title: 'Rank', field: 'grade' },
            { title: 'DAFSC', field: 'dafsc' },
            { title: 'Office', field: 'office_symbol',
                lookup: {'DOM': 'DOM', 'SCOI': 'SCOI'}
                },
            // {
            //     title: 'Birth Place',
            //     field: 'birthCity',
            //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
        ],
        data: props.members,
    });


    return (
        <Box width={1200}>
        <MaterialTable
            title="In Processing"

            columns={state.columns}
            data={state.data}
            actions={[
                {
                    tooltip: 'Remove All Selected Users',
                    icon: 'delete',
                    onClick: (evt, data) => alert('You want to delete ' + state.data.length + ' rows')
                }
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
                                    color: 'white',
                                    backgroundColor: '#43A047',
                                }}
                            >
                                {rowData.assigned_pas}
                            </div>
                        )
                    },
                },
                // {
                //     icon: 'account_circle',
                //     tooltip: 'Show Member Details',
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
                //                 {rowData.duty_title}
                //             </div>
                //         )
                //     },
                // },
            ]}
            options={{
                filtering: true,
                grouping: true,
                search: true,
                selection: true,
                // selectionProps: (rowData: MemberModel) => ({
                //     disabled: rowData.full_name === 'ABRAMS, JOSEPH L',
                //     color: 'primary'
                // })
            }}

            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
        </Box>
    );
};


export default EditMemberTable;
