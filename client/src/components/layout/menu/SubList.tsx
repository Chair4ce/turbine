import * as React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import {Box, Collapse, ListItemIcon, Paper} from "@material-ui/core";
import FlightModel from "../../../store/flights/FlightModel";
import ListItem from "@material-ui/core/ListItem";
import classNames from "classnames";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

interface Props {
    sectionId: any;
    flights: FlightModel[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            position: 'relative',
        },
        section: {
            backgroundColor: 'inherit',
        },
        ListItem: {
            cursor: 'pointer',
        },
        nested: {
            paddingLeft: theme.spacing(6),
        },
        expandIconBackground: {
            position: 'absolute',
            top: 0,
            right: 0,
            height: '30px',
        },
    }),
);

const SubList: React.FC<Props> = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div >
            <Box onClick={handleClick} className={classes.expandIconBackground}>
            {open ? <ExpandLess/> : <ExpandMore/>}
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {props.flights.filter((flight: FlightModel) => {
                    return flight.pas_Code == props.sectionId.pas_Code;
                }).map(item => (

                    <ListItem key={`item-${props.sectionId.pas_Code}-${item.org_id}`}
                              className={classNames(classes.ListItem, classes.nested)}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary={`${item.org_id}`}/>
                    </ListItem>
                ))}
                </List>
            </Collapse>
        </div>
    );
};


export default SubList;