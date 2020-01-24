import * as React from 'react';
import styled from '../../../utils/styled';
import classNames from "classnames";
import SquadronModel from "../../../store/squadrons/SquadronModel";

interface RowProps {
    column1: string;
    column2?: string
    clickItem: () => void;
    className?: string;
}

const ItemRow: React.FC<RowProps> = ({ column1, column2, clickItem, className}) => (
    <Wrapper
        className={classNames('MenuItemRow', className)}
    onClick={clickItem}
    >
        {column1}{column2}
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


