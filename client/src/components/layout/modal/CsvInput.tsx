import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import {CircularProgress, Container, Fab, Modal} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import clsx from 'clsx';
import {green} from "@material-ui/core/colors";
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import MemberModel from "../../../store/members/MemberModel";
import {Deserializer} from "v8";
import {MemberDeserializer} from "../../../utils/MemberDeserializer";
import {ApplicationState} from "../../../store";
import {postFeedback, saveMembersFromCsv} from "../../../store/members/sagas";
import {connect} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
            outline: 'none',
        },
        fileDropArea: {
            height: 150,
            width: 400,
            border: '2px dashed white',
        },
        input: {
        },

        paper: {
            position: 'absolute',
            outline: 'none',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        fileDropContents: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        uploadIcon: {

        },
        fileDropDialog: {
            marginLeft: 20,
        },
        button: {
            fontWeight: 'bold',
            marginLeft: 10,
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

function csvJSON(csv: any) {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        let obj: any = {};
        let currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

const doUpload = async (e: any) => {

    e.preventDefault();
    let formData = new FormData();
    e.persist();

    if (e.type === 'change') {
        const element = document.querySelector('#raised-button-file')! as HTMLInputElement;
        if (element != null && element.files) {
            formData.append('file', element.files[0]);
        }
    } else {
        formData.append('file', e.dataTransfer.files[0]);
    }

    let file: File = formData.get('file') as File;
    if (file) {
        let fileName = file.name;
        if (fileName.toLowerCase().endsWith('ppt')) {
            (document.querySelector('#raised-button-file') as HTMLInputElement).value = '';
        }
        if (fileName.toLowerCase().endsWith('csv')) {
            // await this.props.uploadActions!.upload(formData);
            console.log('its a csv!!');

            // let ele1 = document.querySelector('.uploadContainer') as HTMLElement;
            // let ele2 = document.querySelector('.helpMessage') as HTMLElement;
            // if (ele1 && ele2) {
            //     ele1.style.border = 'none';
            //     ele2.style.display = 'none';
            // }
        } else if (!fileName.toLowerCase().endsWith('ppt')) {
            (document.querySelector('#browseInput') as HTMLInputElement).value = '';
        }
    }


    const reader = new FileReader();

    reader.onload = () => {
        let text = reader.result;

        if (text !== null) {
            if (typeof text === "string") {
                console.log('CSV: ', text.substring(0, 3000) + '...');
            }
        }
        //convert text to json here
        saveMembersFromCsv(csvJSON(text)) ;


    };

    let input = document.querySelector('#raised-button-file')! as HTMLInputElement;

    if (input.files !== null) {
        reader.readAsText(input.files[0]);

    }
};
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
}

interface PropsFromDispatch {
    saveMembersFromCsv: typeof saveMembersFromCsv
}

type AllProps = PropsFromState & PropsFromDispatch;

const CsvInput: React.FC<AllProps> = props => {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const browseInputRef: any = React.createRef();
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };
    const handleClose = () => {
        props.toggleCSVInputModal();
        setOpen(false);
    };
        return (
            <div className={classes.root}>
                {/*<Button onClick={handleVisibility}>Toggle Speed Dial</Button>*/}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">Upload .csv from BLSDM</h2>
                        <Container className={classes.fileDropArea}
                                   onDragEnter={(e: any) => {
                                       let evt = e as Event;
                                       evt.preventDefault();
                                   }}
                                   onDragOver={(e: any) => {
                                       let evt = e as Event;
                                       evt.preventDefault();
                                   }}
                                   onDrop={doUpload}>
                            <input
                                accept="text/csv/*"
                                className={classes.input}
                                style={{display: 'none'}}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={(file) => {
                                    doUpload(file);
                                    handleButtonClick();
                                }}
                                ref={browseInputRef}
                            />
                            <label htmlFor="raised-button-file" className={classes.fileDropContents}>
                                {(loading || success) &&
                                <div className={classes.wrapper}>
                                    <Fab
                                        aria-label="save"
                                        color="primary"
                                        className={buttonClassname}
                                        onClick={handleButtonClick}
                                    >
                                        {success ? <CheckIcon /> : <SaveIcon />}
                                    </Fab>
                                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                                </div>
                                }
                                {(!loading && !success) && <CloudUploadOutlinedIcon color={"primary"} fontSize={"large"} className={classes.uploadIcon}/>}
                                {(!loading && !success) &&
                                <span id="simple-modal-dialog"
                                      className={classes.fileDropDialog}>Drag and drop or</span>
                                }
                                {(!loading && !success) &&
                                < Button variant={"outlined"} component={"span"} className={classes.button}>
                                    Browse
                                    </Button>
                                }
                            </label>
                        </Container>
                    </div>
                </Modal>
            </div>
        );
// function browseViaInput() {
//         return () => {
//             if (browseInputRef !== null) {
//             browseInputRef.current.click();
//             }
//         };
//     }
    };

const mapStateToProps = ({}: ApplicationState) => ({
});

const mapDispatchToProps = {
    saveMembersFromCsv
};
export const ConnectedCsvInput = connect(mapStateToProps, mapDispatchToProps)(CsvInput);