import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {useDispatch} from "react-redux";
import {MemberSerializer} from "../../util/MemberSerializer";
import MemberModel from "../../store/members/models/MemberModel";
import {stageGainingUploadData} from "../../store/members";
import ErrorDialog from "../appHeader/ErrorDialog";
import {FILE_UPLOAD} from "./AppSettingsPage";


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
    parentCallback: (type: string, status: boolean, data?: string) => void;
    className?: string;
}


export const GainingFileUpload: React.FC<Props> = props => {
    const domRef = React.useRef();
    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(domRef.current); // DOM node
    }, []);

    const [error, updateError] = useState("");
    function handleCallback() {
        updateError("");
    }

    const onDrop = useCallback((acceptedFiles: any[]) => {
        acceptedFiles.forEach((file: any) => {
            let fileName = file.name;

            if(fileName.split('.').pop() === "xlsx") {
                readXlsxFile(file, {
                    schema, transformData(data: any) {
                        return data.splice(2, data.length - 3)
                    }
                }).then(((rows: any) => {
                    if (error) {
                        props.parentCallback(FILE_UPLOAD.GAINING_SUCCESS,false)
                    } else {
                        props.parentCallback(FILE_UPLOAD.GAINING_SUCCESS,true)
                        dispatch(stageGainingUploadData(MemberSerializer.serializeGainingToStaging(MemberModel.filterEnlistedStagingGainingUploadOnly(rows.rows))));
                    };
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
    },[])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    const {ref, ...rootProps} = getRootProps()


    return (
        <>
            <Paper {...rootProps} className={classes.fileDropArea}>
                <input {...getInputProps()} />
                {error.length > 0 ? <ErrorDialog title={"File Type Error"} error={error} callback={handleCallback}/> : null}
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </Paper>
        </>
    )
}

export default GainingFileUpload;



const schema = {
    'GAINING_PAS': {
        prop: 'gainingPas',
        type: String,
        required: true
    },
    'SSAN': {
        prop: 'mbrId',
        type: String,
        required: true
    },
    'FULL_NAME': {
        prop: 'fullName',
        type: String,
        required: true
    },
    'GRADE': {
        prop: 'grade',
        type: String,
        required: false
    },
    'LOSING_PAS': {
        prop: 'losingPas',
        type: String,
        required: false
    },
    'LOSING_PAS_CLEARTEXT': {
        prop: 'losingPasCleartext',
        type: String,
        required: false
    },
    'DAFSC': {
        prop: 'dafsc',
        type: String,
        required: false
    },
    'SPONSOR_SSAN': {
        prop: 'sponsorId',
        type: String,
        required: false
    },
    'DOR': {
        prop: 'dor',
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

}
