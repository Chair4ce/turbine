import React from 'react';
import MaterialTable, { Column } from 'material-table';
import MemberModel from "../../store/members/MemberModel";

interface Row {
    full_name: string;
    grade: string;
    dafsc: string;
    office_symbol: string;
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
            { title: 'Office', field: 'office_symbol' },




            // {
            //     title: 'Birth Place',
            //     field: 'birthCity',
            //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
        ],
        data: props.members,
    });


    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
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
    );
};

export default EditMemberTable;
