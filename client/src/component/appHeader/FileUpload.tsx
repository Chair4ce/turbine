import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Paper} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {saveCurrentRoster} from "../../store/members/thunks";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {MemberSerializer} from "../../util/MemberSerializer";
import MemberModel from "../../store/members/models/MemberModel";
import {stageMemberUploadData} from "../../store/members";
import UploadMemberModel from "../../store/members/models/UploadMemberModel";


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
        }

    }),
);

interface Props {
    parentCallback: (type: string, status: boolean, data?: string) => void;
    className?: string;
}
const FILE_UPLOAD_ACTIONS = {
    ALPHA_SUCCESS: 'FILE_UPLOAD/ALPHA_SUCCESS',
    GAINING_SUCCESS: 'FILE_UPLOAD/GAINING_SUCCESS',
    UPMR_SUCCESS: 'FILE_UPLOAD/UPMR_SUCCESS',
}

export const FileUpload: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();


    const onDrop = useCallback(acceptedFiles => {
        console.log("OOOOoooo Files! gimme gimme")
        acceptedFiles.forEach((file: any) => {
                let fileName = file.name;

                if(fileName.toString().includes("alpha" || "Alpha")) {console.log("found an Alpha roster")}
                if(fileName.split('.').pop() === "xlsx") {
                    const data = readXlsxFile(file, {
                        schema, transformData(data: any) {
                            return data.splice(2, data.length - 3)
                        }
                    }).then(((rows: any, errors: any) => {
                        if (errors) {
                            props.parentCallback(FILE_UPLOAD_ACTIONS.ALPHA_SUCCESS,false)

                        } else {
                            props.parentCallback(FILE_UPLOAD_ACTIONS.ALPHA_SUCCESS,true)
                            dispatch(stageMemberUploadData(MemberSerializer.serializeToStaging(MemberModel.filterEnlistedStagingUploadOnly(rows.rows))));
                        }
                        ;
                    }))
                } else {
                    // updateError("Please convert file to xlsm before uploading again, thank you!")
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
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </Paper>
        </RootRef>
    )
}

export default FileUpload;

export {
    FILE_UPLOAD_ACTIONS as FILE_UPLOAD
}

const schema = {
    'SSAN': {
        prop: 'ssan',
        type: String,
        required: true
    },
    'FULL_NAME': {
        prop: 'fullName',
        type: String,
        required: true
        // Excel stores dates as integers.
        // E.g. '24/03/2018' === 43183.
        // Such dates are parsed to UTC+0 timezone with time 12:00 .
    },
    'GRADE': {
        prop: 'grade',
        type: String,
        required: false
    },
    'ASSIGNED_PAS': {
        prop: 'assignedPas',
        type: String,
        required: false
    },
    'OFFICE_SYMBOL': {
        prop: 'officeSymbol',
        type: String,
        required: false
    },
    'DUTY_TITLE': {
        prop: 'dutyTitle',
        type: String,
        required: false
    },
    'DUTY_START_DATE': {
        prop: 'dutyStartDate',
        type: Date,
        required: false
    },
    'DOR': {
        prop: 'dor',
        type: Date,
        required: false
    },
    'DAFSC': {
        prop: 'dafsc',
        type: String,
        required: false
    },
    'PAFSC': {
        prop: 'pafsc',
        type: String,
        required: false
    },
    'DATE_ARRIVED_STATION': {
        prop: 'dateArrivedStation',
        type: Date,
        required: false
    },
    'DOS': {
        prop: 'dos',
        type: Date,
        required: false
    },
    'RNLTD': {
        prop: 'rnltd',
        type: Date,
        required: false
    },
    'SUPV_NAME': {
        prop: 'supvName',
        type: String,
        required: false
    },
    'SUPV_BEGIN_DATE': {
        prop: 'supvBeginDate',
        type: Date,
        required: false
    },
    'DEROS': {
        prop: 'deros',
        type: Date,
        required: false
    }

}