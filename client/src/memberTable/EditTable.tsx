import React from 'react';
import MaterialTable, {Column} from 'material-table';
import MemberModel from "../dispatchAndState/members/MemberModel";
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';

interface Row {
    id: number;
    full_name: string;
    grade: string;
    dafsc: string;
    office_symbol: string;
    duty_start_date: string;
    duty_phone: string;
    supv_name: string;
    date_arrived_station: string;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

interface Props {
    members: MemberModel[];
    loading: boolean;
    title: string;
    className?: string;
}

const EditTable: React.FC<Props> = props => {
    const [state, setState] = React.useState<TableState>({
        columns: [
            {title: 'Avatar', field: 'url', render: () => <EmojiEmotionsTwoToneIcon/>},
            {title: 'Name', field: 'full_name'},
            {title: 'Rank', field: 'grade'},
            {title: 'DAFSC', field: 'dafsc'},
            {title: 'Office', field: 'office_symbol'},
            {title: 'Duty Title', field: 'duty_title'},
            {title: 'Start Date', field: 'duty_start_date'},
            {title: 'Phone', field: 'duty_phone'},
            {title: 'Supervisor', field: 'supv_name'},
            {title: 'Arrived', field: 'date_arrived_station'},

            //rowData => <img src={rowData.id} style={{width: 50, borderRadius: '50%'}}/>
            // {
            //     title: 'Birth Place',
            //     field: 'birthCity',
            //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            // },
        ],
        data: props.members,
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
                                    color: 'white',
                                    backgroundColor: '#43A047',
                                }}
                            >
                                {rowData.supv_name}
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
                filtering: true,
                grouping: true,
                search: true,
                selection: true,
                exportButton: true,
                // selectionProps: (rowData: MemberModel) => ({
                //     disabled: rowData.fullName === 'ABRAMS, JOSEPH L',
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
            }}
        />

    );
};

export default EditTable;
