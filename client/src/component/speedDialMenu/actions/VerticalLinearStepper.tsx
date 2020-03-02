import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Divider, Modal} from "@material-ui/core";
import {ApplicationState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {toggleUploadModal} from "../../../store/modals";
import CsvInput from "./CsvInput";
import {membersFetchRequest} from "../../../store/members";
import {gainingFetchRequest} from "../../../store/gaining";

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
        },

    }),
);

function getSteps() {
    return ['Gaining', 'Alpha', 'Losing', 'UPMR'];
}

// function getStepContent(step: number) {
//     switch (step) {
//         case 0:
//             return 'Upload Gaining roster';
//         case 1:
//             return 'Upload ALPHA roster';
//         case 2:
//             return 'Upload LOSING roster';
//         case 3:
//             return 'Upload UPMR roster';
//         default:
//             return 'finished';
//     }
// }

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


interface Props {
    classname?: string;
}


const VerticalLinearStepper: React.FC<Props> = props => {
    const squadrons = useSelector(({squadrons}: ApplicationState) => squadrons.squadrons);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);
    const [squadron, setSquadron] = React.useState('');
    const [newPasCode, setNewPasCode] = React.useState('');
    const [newSquadron, setNewSquadron] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [sqInputError, setSqInputError] = React.useState(false);
    const [pasCodeInputError, setPasCodeInputError] = React.useState(false);
    const [errState, setErrState] = React.useState(false);

    React.useEffect(() => {
        if (errState) {
            if (newSquadron.length > 0) {
                setSqInputError(false);
            } else {
                setSqInputError(true);
            }
            if (newPasCode.length === 8) {
                setPasCodeInputError(false);
            } else {
                setPasCodeInputError(true);
            }
        }
    }, [newPasCode, newSquadron, errState]);

    // const timer = React.useRef<number>();


    // const handleAddSquadronBtn = async () => {
    //     if (newSquadron.length > 0 && newPasCode.length === 8) {
    //         await postNewSquadron(new SquadronModel(newSquadron, newPasCode));
    //         setNewSquadron('');
    //         setNewPasCode('');
    //         setErrState(false);
    //         setSqInputError(false);
    //         setPasCodeInputError(false);
    //         setErrState(false);
    //         setChecked(prev => !prev);
    //         await dispatch(squadronsFetchRequest());
    //     } else {
    //         setErrState(true);
    //     }
    // };

    // const handleShowAddSquadronBtn = () => {
    //     setChecked(prev => !prev);
    // };
    const handleClose = () => {
        dispatch(toggleUploadModal(false));
        dispatch(membersFetchRequest());
        dispatch(gainingFetchRequest());
        setOpen(false);
    };

    // const handleNewSquadronInputChange = (e: any) => {
    //     setNewSquadron(e.target.value);
    // };
    // const handleNewPasCodeInputChange = (e: any) => {
    //     setNewPasCode(e.target.value);
    // };

    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setSquadron(event.target.value as string);
    //     if (activeStep > 0) {
    //         setActiveStep(0);
    //     }
    // };


    // function renderSquadronList() {
    //     return (squadrons.map((item: any, index) =>
    //             <MenuItem
    //                 key={index}
    //                 value={item.pas}>
    //                 {item.squadron}
    //             </MenuItem>
    //         )
    //     )
    // }

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
                    {/*  <FormControl className={classes.squadronFormControl}>
                        <div className={classes.selectSquadronGrp}>
                            <div className={classes.selectSquadronLabel}>
                                <label>Select a Squadron</label>
                                <IconButton
                                    color="primary"
                                    aria-label="add new Squadron"
                                    className={classes.addBtn}
                                    onClick={handleShowAddSquadronBtn}>
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
                            {...(checked ? {timeout: 100} : {})}
                        >
                            <Paper elevation={0} className={classes.addSqPaper}>
                                <form className={classes.addSquadronFormGrp} autoComplete="off">
                                    <TextField error={sqInputError} id="squadron-standard" label="Squadron"
                                               variant="outlined" className={classes.addSquadronInput}
                                               onChange={handleNewSquadronInputChange}
                                               value={newSquadron}/>
                                    <TextField error={pasCodeInputError} id="pasCode-standard" label="PAS Code"
                                               variant="outlined" className={classes.addSquadronInput}
                                               onChange={handleNewPasCodeInputChange}
                                               value={newPasCode}/>
                                    <Button size="small"  color={"inherit"} className={classes.margin} onClick={handleShowAddSquadronBtn}>
                                        Cancel
                                    </Button>
                                    <Button size="small" color={"primary"} className={classes.margin} onClick={handleAddSquadronBtn}>
                                        Save
                                    </Button>
                                </form>
                            </Paper>
                        </Fade>

                        <FormHelperText></FormHelperText>
                    </FormControl>*/}
                    <Typography align={"center"} variant={"h3"}>Upload Rosters</Typography>
                    {/*<Divider light variant="middle" className={classes.divider}/>*/}
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {/*<Typography>{getStepContent(index)}</Typography>*/}
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
                                        <CsvInput squadron={squadron} uploadType={label}/>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}

                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All rosters uploaded - you&apos;re finished</Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </div>
            </Modal>
        </div>
    );
};


export default VerticalLinearStepper;