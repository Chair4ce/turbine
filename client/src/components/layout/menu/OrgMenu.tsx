import * as React from 'react';
import SquadronModel from "../../../store/squadrons/SquadronModel";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ApplicationState} from "../../../store";
import SendIcon from '@material-ui/icons/Send';
import {connect} from "react-redux";
import FlightModel from "../../../store/flights/FlightModel";
import {Box, ListItemIcon, Paper} from "@material-ui/core";
import SubList from "./SubList";

interface PropsFromState {
    squadrons: SquadronModel[];
    flights: FlightModel[];
    isLoading: boolean;
    hasErrors: string | undefined;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center',
            width: '330px',
            top: '89px',
            left: '20px',
            maxWidth: '330px',
            position: 'absolute',
            maxHeight: '100vh',
        },
        listSection: {
            display: 'block',
            backgroundColor: 'inherit',
            padding: 0,
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        ListItem: {
            cursor: 'pointer',
        },
        sectionId: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
        },
        sectionIdIcon: {
            justifyContent: 'center',
        }
    }),
);

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

const OrgMenu: React.FC<AllProps> = props => {
    const classes = useStyles();

    return (
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}
              subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                      Squadrons
                  </ListSubheader>
              }>

            <Paper elevation={5}>


                <List component="div" disablePadding>

                    {!props.isLoading && props.squadrons.map((sectionId: any) => (
                        <ListItem button key={`section-${sectionId.pas_Code}`}
                                  className={classes.listSection}>
                            <Box component={'div'} className={classes.sectionId}>
                                <ListItemIcon className={classes.sectionIdIcon}>
                                    <SendIcon/>
                                </ListItemIcon>
                                <ListItemText className={classes.ListItem} primary={`${sectionId.squadron}`}/>
                            </Box>
                            <Box component={'div'} className={classes.sectionId}>
                                <SubList
                                    sectionId={sectionId}
                                    flights={props.flights}
                                />
                            </Box>
                        </ListItem>
                    ))}
                </List>


            </Paper>
        </List>
    );
};

const mapStateToProps = ({squadrons, flights}: ApplicationState) => ({
    isLoading: squadrons.loading,
    hasErrors: squadrons.errors,
    squadrons: squadrons.squadrons,
    flights: flights.flights
});

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrgMenu);
