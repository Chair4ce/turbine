import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import UniqueAFSCRows from "./UniqueAFSCRows";
import GenericGroupCollectionModel from "../../../store/members/models/GenericGroupCollectionModel";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    }),
);
interface Props {
    data: GenericGroupCollectionModel[];
    className?: string;
}

const RowsByAFSCContainer: React.FC<Props> = props => {
    const classes = useStyles();


    return (
        <div className={classNames(props.className, classes.root)}>
            {props.data.map((m: GenericGroupCollectionModel, index) =>
             <UniqueAFSCRows key={index} uAFSC={m.genericGroup} members={m.members}/>
            )}
        </div>
    );
};

export default RowsByAFSCContainer;