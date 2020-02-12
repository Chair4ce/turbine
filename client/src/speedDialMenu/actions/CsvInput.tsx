import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import {CircularProgress, Container, Fab} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import clsx from 'clsx';
import {green} from "@material-ui/core/colors";
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import {saveMembersFromCsv} from "../../dispatchAndState/members/sagas";
import {connect} from "react-redux";
import uploadMemberModel from "../../dispatchAndState/members/UploadMemberModel";
import {UploadMemberDeserializer} from "../../util/uploadMemberSerializer";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
            outline: 'none',
        },
        fileDropArea: {
            height: 250,
            width: 630,
            border: '2px dashed white',
        },
        input: {},
        fileDropContents: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        uploadIcon: {},
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
            pointerEvents: 'none',
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
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        fileDropSuccess: {
            pointerEvents: 'none',
        }
    }),
);

function csvJSON(csv: any) {
    let lines = csv.split("\n");
    let result = [];
    if (lines[0].startsWith("FOR OFFICIAL USE ONLY")) {
        lines.shift();
        lines.shift();
        lines.pop();
    };

    let commaRegex = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/g;
    let quotesRegex = /^"(.*)"$/g;
    let headers = lines[0].split(commaRegex).map((h: any) => h.replace(quotesRegex, "$1"));
    let lowerHeaders = lower(headers);


    for (let i = 1; i < lines.length; i++) {
        let obj: any = {};
        let currentline = lines[i].split(commaRegex);

        for (let j = 0; j < headers.length; j++) {
            obj[lowerHeaders[j]] = currentline[j].replace(quotesRegex, "$1");

        }
        result.push(obj);
    }
    //return result; //JavaScript object
    return result; //JSON
}

function snake_case(str: string) {
    return str.toLowerCase().replace(/\W+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

function lower(obj: any) {
    for (let prop in obj) {
        if (typeof obj[prop] === 'string') {
            obj[prop] = snake_case(obj[prop]);
        }
        if (typeof obj[prop] === 'object') {
            lower(obj[prop]);
        }
    }
    return obj;
}

const doUpload = async (e: any, squadron: string) => {

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
        if (fileName.toLowerCase().endsWith('csv')) {
            // let input = document.querySelector('#raised-button-file')! as HTMLInputElement;

            const reader = new FileReader();

            reader.readAsText(file);

            reader.onload = () => {
                let csv = reader.result;
                if (csv !== null) {
                    if (typeof csv === "string") {
                        let members: uploadMemberModel[] = UploadMemberDeserializer.deserialize(csvJSON(csv));
                        saveMembersFromCsv(members);
                        // console.log('CSV: ', csv.substring(0, 3000) + '...');
                    }
                }
            };
        } else {
            console.log("not a csv")
        }
    }
};



interface PropsFromState {
    squadron?: string
}

interface PropsFromDispatch {
    saveMembersFromCsv: typeof saveMembersFromCsv
}

type AllProps = PropsFromState & PropsFromDispatch;

const CsvInput: React.FC<AllProps> = props => {

    const classes = useStyles();

    const browseInputRef: any = React.createRef();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const FileDropClassname = clsx({
        [classes.fileDropSuccess]: success,
    });

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = (e: any) => {
        if (!loading && !success) {
            setSuccess(false);
            setLoading(true);
            if (props.squadron){
            doUpload(e, props.squadron);
            }
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className={classes.root}>
                    <Container className={classNames(classes.fileDropArea, FileDropClassname)}
                               onDragEnter={(e: any) => {
                                   let evt = e as Event;
                                   evt.preventDefault();
                               }}
                               onDragOver={(e: any) => {
                                   let evt = e as Event;
                                   evt.preventDefault();
                               }}
                               onDrop={handleButtonClick}
                    >
                        <input
                            accept="text/csv/*"
                            className={classes.input}
                            style={{display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleButtonClick}
                            ref={browseInputRef}
                        />
                        <label htmlFor="raised-button-file" className={classes.fileDropContents}>
                            {(loading || success) &&
                            <div className={classes.wrapper}>
                                <Fab
                                    aria-label="save"
                                    color="primary"
                                    className={buttonClassname}
                                >
                                    {success ? <CheckIcon/> : <SaveIcon/>}
                                </Fab>
                                {loading && <CircularProgress size={68} className={classes.fabProgress}/>}
                            </div>
                            }
                            {(!loading && !success) && <CloudUploadOutlinedIcon color={"primary"} fontSize={"large"}
                                                                                className={classes.uploadIcon}/>}
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
    );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
    saveMembersFromCsv
};
export const ConnectedCsvInput = connect(mapStateToProps, mapDispatchToProps)(CsvInput);