import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 1500,
        },
        fileDropArea: {
            position: 'absolute',
            height: 100,
            width: 100,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px dashed white',
        },
        input: {},
        button: {}
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


const doUpload = () => {
    let input = document.querySelector('#raised-button-file')! as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = () => {
        let text = reader.result;
        if (text !== null) {
            if (typeof text === "string") {
                console.log('CSV: ', text.substring(0, 3000) + '...');
            }

        }

        //convert text to json here
        let json = csvJSON(text);
        console.log(json);
    };
    if (input.files !== null) {
        reader.readAsText(input.files[0]);

    }
};

interface Props {

}

const CsvInput: React.FC<Props> = props => {
        const classes = useStyles();

        return (
            <div className={classes.root}>
                {/*<Button onClick={handleVisibility}>Toggle Speed Dial</Button>*/}
                <Backdrop open={true}/>
                <Box className={classes.fileDropArea}>
                    <input
                        accept="text/csv/*"
                        className={classes.input}
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={doUpload}
                    />
                    <label htmlFor="raised-button-file">
                        <Button component={"span"} className={classes.button}>
                            Upload
                        </Button>
                    </label>
                </Box>
            </div>
        );
    };




export default CsvInput;