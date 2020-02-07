

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {blueGrey} from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blueGrey,
        secondary: {
            main: '#E5E5E0',
        },
    },
});
