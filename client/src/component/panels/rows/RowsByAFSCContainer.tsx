import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import UniqueAFSCRows from "./UniqueAFSCRows";
import GenericGroupCollectionModel from "../../../store/members/GenericGroupCollectionModel";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        divider: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            background: '#424651',
            width: '100%',
            height: 20,
            top: 0,
            zIndex: 120,
            position: 'sticky',
            borderBottom: '1px solid #ddd',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#5D8AA8',
                // color: '#333333',
            }
        },
        dividerText: {
            width: '100%',
            padding: theme.spacing(1)
        },
        afscGroup: {
            display: 'block',
            width: '100%'
        }
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