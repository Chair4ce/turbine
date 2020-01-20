import * as React from 'react';
import styled from '../../utils/styled';

interface RowProps {
    item: string;
    clickItem: () => void;
}

const ItemRow: React.FC<RowProps> = ({ item, clickItem}) => (
    <Wrapper
        className="MenuItemRow"
    onClick={clickItem}
    >
        {item}
    </Wrapper>
);

export default ItemRow;

export const Wrapper = styled('div')`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;


cursor: pointer;
color: rgba(255, 255, 255, 0.3);
font-size: 16px;
width: 100%;

padding-left: 20px;



`;


