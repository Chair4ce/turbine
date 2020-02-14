import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {blueGrey} from "@material-ui/core/colors";

export const darktheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blueGrey,
        secondary: {
            main: '#4256e5',
        },
    },
});
