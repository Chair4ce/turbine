import * as React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import LoadingSpinner from "../data/LoadingSpinner";
import {connect} from "react-redux";
import MemberModel from "../../store/members/MemberModel";
import { postFeedback } from '../../store/members/sagas';
import TabbedRosters from "../TabbedRosters";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        section: {
            backgroundColor: 'inherit',
        },
        loadingSpinner: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            display: 'block',
            Height: '100%',
            padding: theme.spacing(2),
        },
    }),
);

interface PropsFromState {
    members: MemberModel[];
    loading: boolean
    className?: string;
}

interface PropsFromDispatch {
    postFeedback: typeof postFeedback;
}

type AllProps = PropsFromDispatch & PropsFromState;

const InProcessingContainer: React.FC<AllProps> = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <div className={classes.toolbar}/>
                {props.loading ? (
                    <Box component={'div'} className={classes.loadingSpinner}>
                        <LoadingSpinner/>
                    </Box>
                ) : (props.members!.length > 0 && (<TabbedRosters
                    members={props.members}
                />))}
        </div>
    );
};


const mapStateToProps = () => ({});

const mapDispatchToProps = {
    postFeedback,
};
export const ConnectedInProcessingContainer = connect(mapStateToProps, mapDispatchToProps)(InProcessingContainer);