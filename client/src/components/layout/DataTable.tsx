import * as React from 'react';
import styled from '../../utils/styled';
import {EaseIn} from "../animations/transitions";

interface DataTableProps {
    columns: string[];
    widths?: string[];
}

const DataTable: React.FC<DataTableProps> = ({ children, widths, columns }) => (
    <Wrapper>
        <thead>
            <tr>
                {columns.map((column, i) => (
                    <th key={column} style={widths && widths[i] ? { width: widths[i] } : undefined}>
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </Wrapper>
);

export default DataTable;

const Wrapper = styled('table')`
    margin-bottom: 0;
    box-shadow: 2px 0px 25px 0px rgba(0,0,0,0.34);
    border-top: 1px solid ${props => props.theme.colors.borders};
    border-bottom: 1px solid ${props => props.theme.colors.borders};

    thead {

        tr {

            th {
                width: 100%;
                padding: 1rem;
                text-align: left;
                border-bottom: 2px solid ${props => props.theme.colors.borders};
            }
        }
    }

    tbody {
        tr {
            border-top: 1px solid ${props => props.theme.colors.borders};

            &:nth-of-type(even) {
                background: ${props => props.theme.colors.tableOdd};
            }

            td {
                padding: 0.5rem 1rem;
                font-size: 0.85rem;
            }
        }
    }
    -webkit-animation: ${EaseIn} .4s;
`;
