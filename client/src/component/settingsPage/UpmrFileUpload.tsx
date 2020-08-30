import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Paper} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {useDispatch} from "react-redux";
import {MemberSerializer} from "../../util/MemberSerializer";
import MemberModel from "../../store/members/models/MemberModel";
import {stageGainingUploadData, stageMemberUploadData} from "../../store/members";
import ErrorDialog from "../appHeader/ErrorDialog";
import {FILE_UPLOAD} from "./AppSettingsPage";
import {PositionSerializer} from "../../util/PositionSerializer";
import {stagePositionUploadData} from "../../store/positions";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            zIndex: 4000,

        },
        fileDropArea: {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed white',
        },
        errorMsg: {
            display: 'flex',
            width: 300,
            justifyContent: 'center',
            alignItems: 'center'
        }

    }),
);

interface Props {
    parentCallback: (type: string, status: boolean) => void;
    className?: string;
}


export const UpmrFileUpload: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [error, updateError] = useState("");
    function handleCallback() {
        updateError("");
    }

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file: any) => {
            let fileName = file.name;

            if(fileName.toString().includes("gaining" || "Gaining")) {console.log("found an Gaining roster")}
            if(fileName.split('.').pop() === "xlsx") {
                const data = readXlsxFile(file, {
                    schema, transformData(data: any) {
                        return data.splice(2, data.length - 3)
                    }
                }).then(((rows: any, errors: any) => {
                    if (errors) {
                        props.parentCallback(FILE_UPLOAD.UPMR_SUCCESS,false)
                    } else {
                        props.parentCallback(FILE_UPLOAD.UPMR_SUCCESS,true)
                        dispatch(stagePositionUploadData(PositionSerializer.serializeToStaging(rows.rows)));
                    }
                    ;
                }))
            } else {
                updateError("Please convert file to xlsm before uploading again")
            }





            //
            //
            // const reader = new FileReader()
            //
            // reader.onabort = () => console.log('file reading was aborted')
            // reader.onerror = () => console.log('file reading has failed')
            // reader.onload = () => {
            //     // Do whatever you want with the file contents
            //     const binaryStr = reader.result
            //     console.log(binaryStr)
            // }
            // reader.readAsArrayBuffer(file)
        })
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    const {ref, ...rootProps} = getRootProps()
    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps} className={classes.fileDropArea}>
                <input {...getInputProps()} />
                {error.length > 0 ? <ErrorDialog title={"File Type Error"} error={error} callback={handleCallback}/> : null}
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </Paper>
        </RootRef>
    )
}

export default UpmrFileUpload;

const schema = {
    'PASCODE': {
        prop: 'pasCode',
        type: String,
        required: true
    },
    'ORGN_STRUCT_ID': {
        prop: 'orgStructureId',
        type: String,
        required: false
        // Excel stores dates as integers.
        // E.g. '24/03/2018' === 43183.
        // Such dates are parsed to UTC+0 timezone with time 12:00 .
    },
    'AFSC_AUTH': {
        prop: 'afscAuth',
        type: String,
        required: false
    },
    'GRD_AUTH': {
        prop: 'grdAuth',
        type: String,
        required: false
    },
    'CURR_QTR': {
        prop: 'currQtr',
        type: String,
        required: false
    },
    'PROJ_QTR1': {
        prop: 'projQtr1',
        type: String,
        required: false
    },
    'PROJ_QTR2': {
        prop: 'projQtr2',
        type: String,
        required: false
    },
    'PROJ_QTR3': {
        prop: 'projQtr3',
        type: String,
        required: false
    },
    'PROJ_QTR4': {
        prop: 'projQtr4',
        type: String,
        required: false
    },
    'POS_NR': {
        prop: 'posNr',
        type: String,
        required: false
    },
    'GR_ASGN': {
        prop: 'gradeAssigned',
        type: String,
        required: false
    },
    'DAFSC': {
        prop: 'dafscAssigned',
        type: String,
        required: false
    },
    'NAME': {
        prop: 'nameAssigned',
        type: String,
        required: false
    },
    'SSAN': {
        prop: 'mbrIdAssigned',
        type: String,
        required: false
    },
    //Alternate Misc Column Spellings/chars
    'CURR QTR': {
        prop: 'currQtr',
        type: String,
        required: false
    },
    'PROJ QTR1': {
        prop: 'projQtr1',
        type: String,
        required: false
    },
    'PROJ QTR2': {
        prop: 'projQtr2',
        type: String,
        required: false
    },
    'PROJ QTR3': {
        prop: 'projQtr3',
        type: String,
        required: false
    },
    'PROJ QTR4': {
        prop: 'projQtr4',
        type: String,
        required: false
    }
}