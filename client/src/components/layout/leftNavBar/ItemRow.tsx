import * as React from 'react';
import styled from '../../../utils/styled';
import classNames from "classnames";
import SquadronModel from "../../../store/squadrons/SquadronModel";
import {EaseIn} from "../../animations/transitions";

interface RowProps {
    column1: string;
    active: boolean;
    clickItem: () => void;
    column2?: string
    className?: string;
}

const ItemRow: React.FC<RowProps> = ({column1, active, column2, clickItem, className}) => (
    <Wrapper
    >
        {!active ? (<ActiveRows
            className={classNames('MenuItemRow', className)}
            onClick={clickItem}>
            <LeftColumn>
               {column1}
            </LeftColumn>
            <RightColumn
            className={"rCol"}>
              {column2}
            </RightColumn>
        </ActiveRows>) : (<InActiveRows>
            <LeftColumn>
                {column1}
            </LeftColumn>
            <RightColumn
                className={"rCol"}>
                {column2}
            </RightColumn>
        </InActiveRows>)}
    </Wrapper>
);

export default ItemRow;

export const Wrapper = styled('div')`
display: flex;
flex-direction: row;
//cursor: pointer;
//color: rgba(255, 255, 255, 0.3);
//font-size: 16px;
width: 100%;
:hover {
  .rCol {
  display: flex;
  }
}
`;

const LeftColumn = styled('span')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding-left: 12px;
`;

const RightColumn = styled('span')`
  position: relative;
  display: none;
  flex-direction: row;
  justify-content: flex-end;
  width: 80px;
  margin-right: 6px;
  -webkit-animation: ${EaseIn} .5s;
`;


const ActiveRows = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  
   width: 100%;
  cursor: pointer;
  color: rgba(255,255,255,0.53);
  font-size: 16px;

`;
const InActiveRows = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
   width: 100%;
  cursor: default;
  color: rgba(255, 255, 255, 0.1);
  font-size: 16px;
`;


