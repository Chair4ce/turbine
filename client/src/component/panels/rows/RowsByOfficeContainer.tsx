import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import GenericGroupCollectionModel from "../../../store/members/models/GenericGroupCollectionModel";
import OfficeGroups from "../containers/OfficeGroups";



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

const RowsByOfficeContainer: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div className={classNames(props.className, classes.root)}>
            {props.data.map((m: GenericGroupCollectionModel, index) =>
                <OfficeGroups key={index} office={m.genericGroup} members={m.members}/>
            )}
        </div>
    );
};

export default RowsByOfficeContainer;