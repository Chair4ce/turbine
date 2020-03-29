export class CSVImportModel {

    public missingHeaders: string[];
    public json: object[];

    constructor(headerType: string, verifyHeaders: any) {
        this.missingHeaders = [];
        this.json = [];
        switch (headerType) {
            case "Gaining":
                for (let header in this.gainingHeaders) {
                    let found = false;

                    for (let prop in verifyHeaders) {
                        if (typeof verifyHeaders[prop] === 'string') {
                            if (verifyHeaders[prop] === this.gainingHeaders[header]) {
                                found = true;
                            }
                        }
                    }

                    if (!found) this.missingHeaders.push(this.gainingHeaders[header]);

                }
                break;
            case "Alpha":
                for (let header in this.alphaHeaders) {
                    let found = false;
                    for (let prop in verifyHeaders) {
                        if (typeof verifyHeaders[prop] === 'string') {
                            if (verifyHeaders[prop] === this.alphaHeaders[header]) {
                                found = true;
                            }
                        }
                    }
                    if (!found) this.missingHeaders.push(this.alphaHeaders[header]);
                }
                break;
            case "UPMR":
                for (let header in this.upmrHeaders) {
                    let found = false;
                    for (let prop in verifyHeaders) {
                        if (typeof verifyHeaders[prop] === 'string') {
                            if (verifyHeaders[prop] === this.upmrHeaders[header]) {
                                found = true;
                            }
                        }
                    }
                    if (!found) this.missingHeaders.push(this.upmrHeaders[header]);
                }
                break;
            default:
                break;
        }
    }

    private alphaHeaders: string[] = [
        'SSAN',
        'FULL_NAME',
        'TAFMSD',
        'GRADE',
        'ASSIGNED_PAS',
        'DAFSC',
        'OFFICE_SYMBOL',
        'DUTY_TITLE',
        'DUTY_START_DATE',
        'DUTY_PHONE',
        'SUPV_NAME',
        'SUPV_BEGIN_DATE',
        'DATE_ARRIVED_STATION',
        'RNLTD',
        'DOR',
    ];


    private gainingHeaders: string[] = [
        'SSAN',
        'FULL_NAME',
        'RNLTD',
        'GRADE',
        'GAINING_PAS',
        'DAFSC',
        'DOR',
        'DATE_DEP_LAST_DUTY_STN',
        'SPONSOR_SSAN',
        'LOSING_PAS',
    ];

    private upmrHeaders: string[] = [
        'PASCODE',
        'ORGN_STRUCT_ID',
        'AFSC_AUTH',
        'GRD_AUTH',
        'CURR_QTR',
        'PROJ_QTR1',
        'PROJ_QTR2',
        'PROJ_QTR3',
        'PROJ_QTR4',
        'SSAN',
    ];
}