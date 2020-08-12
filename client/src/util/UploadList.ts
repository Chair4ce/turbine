import {saveCurrentRoster} from "../store/members/thunks";
// @ts-ignore
import readXlsxFile from "read-excel-file";
import {useDispatch} from "react-redux";
import {membersFetchError} from "../store/members";


export class UploadList {
    public static handleFile = (e: HTMLInputElement, type: string) => {
        switch (type) {
            case 'Current':
                return readData(CurrentSchema);
            case 'Gaining':
                return readData(GainingSchema);
            case 'Position':
                return readData(CurrentSchema);
            default:
                return null;

        }
        function readData(schema: Object) {
            return readXlsxFile(e.files[0], {
                schema, transformData(data: any) {
                    return data.splice(2, data.length - 3)
                }
            }).then(((rows: any, errors: any) => {
                if (errors) {
                } else {
                    return rows.rows;
                }
            }));
        }
    }
}

const GainingSchema = {
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

const CurrentSchema = {
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