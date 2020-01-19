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
    color: ${props => props.theme.colors.textLight};

    thead {

        tr {

            th {
                width: 100%;
                padding: 1rem;
                text-align: left;
                    }
        }
    }

    tbody {
        tr {
 
              td {
                padding: 0.5rem 1rem;
                font-size: 0.85rem;
            }
        }
    }
    -webkit-animation: ${EaseIn} .4s;
`;
