import * as React from 'react';
import SquadronModel from "../../../store/squadrons/SquadronModel";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface Props {
    squadron: SquadronModel[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
    }),
);

const StickyList: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <List className={classes.root} subheader={<li />}>
            {props.squadron.map((sectionId: any) => (
                <li key={`section-${sectionId}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>{`${sectionId.squadron}`}</ListSubheader>
                        {[0, 1, 2].map(item => (
                            <ListItem key={`item-${sectionId}-${item}`}>
                                <ListItemText primary={`Item ${item}`} />
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
};


export default StickyList;