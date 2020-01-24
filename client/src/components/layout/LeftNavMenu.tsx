import * as React from 'react';
import styled from '../../utils/styled';

interface RowProps {
    item: string;
    clickItem: () => void;
}

const ItemRow: React.FC<RowProps> = ({ item, clickItem}) => (
    <Wrapper
    onClick={clickItem}
    >
        {item}
    </Wrapper>
);

export default ItemRow;

export const Wrapper = styled('div')`
text-align: center;
cursor: pointer;
color: rgba(255, 255, 255, 0.3);
line-height: 22px;
font-size: 16px;
width: 100%;
display: flex;
padding-left: 20px;

:hover {
background: #333;
}

`;


