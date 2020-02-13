import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Divider, Fade, FormControl, IconButton, MenuItem, Modal, Select, TextField} from "@material-ui/core";
import SquadronModel from "../../dispatchAndState/squadrons/SquadronModel";
import {ApplicationState} from "../../dispatchAndState";
import {connect} from "react-redux";
import {ConnectedCsvInput} from "./CsvInput";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            zIndex: 1500,
            outline: 'none',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        paper: {
            position: 'absolute',
            outline: 'none',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        squadronFormControl: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        selectSquadronGrp: {
            flexDirection: 'column',
            justifyContent: 'center',
            width: 200,
            position: 'relative',
        },
        addSquadronFormGrp: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        addSquadronInput: {
            margin: 10,
            minWidth: 100,
        },
        selectSquadron: {
            width: 160,
        },
        selectSquadronLabel: {
            width: '100%',
            padding: 10,
            paddingTop: 0,
            paddingBottom: 0,
        },
        margin: {
            margin: theme.spacing(1),
        },
        addBtn: {
            position: 'relative',
            left: 15,
            padding: 0,

        },
        addSqPaper: {
            position: 'absolute',
            margin: theme.spacing(1)
        },
        divider: {
            margin: theme.spacing(5)
        }
    }),
);

function getSteps() {
    return ['Gaining', 'Alpha', 'Losing', 'UPMR'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return `Upload your unedited GAINING roster from BLSDM`;
        case 1:
            return 'Upload your unedited ALPHA roster from BLSDM';
        case 2:
            return `Upload your unedited LOSING roster from BLSDM`;
        case 3:
            return `Upload your unedited UPMR roster from BLSDM`;
        default:
            return 'finished';
    }
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

interface PropsFromState {
    toggleCSVInputModal: () => void;
    squadronList: SquadronModel[];
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch;

const VerticalLinearStepper: React.FC<AllProps> = props => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);
    const [squadron, setSquadron] = React.useState('');
    const [checked, setChecked] = React.useState(false);

    const handleAddSquadronBtn = () => {
        setChecked(prev => !prev);
    };
    const handleClose = () => {
        props.toggleCSVInputModal();
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSquadron(event.target.value as string);
        if (activeStep > 0) {
            setActiveStep(0);
        }
    };


    function renderSquadronList() {
        return (props.squadronList.map((item: any, index) =>
                <MenuItem
                    key={index}
                    value={item.pas}>
                    {item.squadron}
                </MenuItem>
            )
        )
    }

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <FormControl className={classes.squadronFormControl}>
                        <div className={classes.selectSquadronGrp}>
                            <div className={classes.selectSquadronLabel}>
                                <label>Select a Squadron</label>
                                <IconButton
                                    color="primary"
                                    aria-label="add new Squadron"
                                    className={classes.addBtn}
                                    onClick={handleAddSquadronBtn}>
                                    <AddIcon/>
                                </IconButton>
                            </div>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="selectSquadron"
                                value={squadron}
                                onChange={handleChange}
                                className={classes.selectSquadron}
                            >
                                {renderSquadronList()}
                            </Select>
                        </div>
                        <Fade
                            in={checked}
                            style={{transformOrigin: '0 0 0'}}
                            {...(checked ? {timeout: 1000} : {})}
                        >
                            <Paper className={classes.addSqPaper}>
                                <form className={classes.addSquadronFormGrp} autoComplete="off">
                                    <TextField error={false} id="squadron-standard" label="Squadron"
                                               variant="outlined" className={classes.addSquadronInput}/>
                                    <TextField error={false} id="squadron-standard" label="PAS Code"
                                               variant="outlined" className={classes.addSquadronInput}/>
                                    <Button size="small" className={classes.margin} onClick={handleAddSquadronBtn}>
                                        Save
                                    </Button>
                                </form>
                            </Paper>
                        </Fade>

                        {/*<FormHelperText></FormHelperText>*/}
                    </FormControl>
                    <Divider light variant="middle" className={classes.divider}/>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography>{getStepContent(index)}</Typography>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                        <ConnectedCsvInput squadron={squadron} uploadType={label}/>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}

                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = ({squadrons}: ApplicationState) => ({
    squadronList: squadrons.squadrons
});

const mapDispatchToProps = {};

export const ConnectedVerticalLinearStepper = connect(mapStateToProps, mapDispatchToProps)(VerticalLinearStepper);