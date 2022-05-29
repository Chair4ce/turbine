import createPalette from "@material-ui/core/styles/createPalette";
import './font/roboto/roboto.css';
import './font/rambla/rambla.css';
import { createTheme } from '@material-ui/core';
import brandColors from "./colors/brandColors";

const theme = {
    color: {
        backgroundBase: brandColors.coolBlack,//
        fontPrimary: brandColors.eggWhite,
        fontAction: brandColors.tarBlack,
        backgroundInformation: brandColors.steelBlue,//
        backgroundInactive: brandColors.blueGrayLight,
        backgroundAction: brandColors.safetyOrange,
        backgroundHighlighted: brandColors.mediumBlueGray,//
        backgroundAssigned: brandColors.notEggWhite,
        backgroundModal: brandColors.steelBlue,
        backgroundStatus: brandColors.darkGray,
        backgroundSnackbar: brandColors.mediumBlue,
        fontLoading: brandColors.lightGray,
        fontInactive: brandColors.mediumMediumLightGray,
        fontBackgroundInactive: brandColors.mediumGray,
        buttonInactive: brandColors.mediumBlueGray,//
        buttonActive: brandColors.softMetal,
        buttonBackgroundActive: brandColors.pitchBlack,
        showLessBackground: brandColors.subtleGray,
        addButtonBackground: brandColors.forestGreen,
        addButtonBorder: brandColors.darkGreen,
        fontAddDate: brandColors.eggGray,
        fontError: brandColors.bloodRed,
        fontInputFocus: brandColors.skyBlue,
        deleteButton: brandColors.straightWhite,
        borderModal: brandColors.darkRed,
        deleteButtonFocus: brandColors.brightRed,
        backgroundHeader: brandColors.steelBlue,//
        buttonOnBlack: brandColors.straightWhite,
        regionDividerPrimary: brandColors.mediumMediumBrightBlue,//
        regionDividerSecondary: brandColors.blueBlueGray,//
        backgroundToolTip: brandColors.mediumBlue,
        inProgress: brandColors.stoplightYellow,
        complete: brandColors.stoplightGreen,
        primaryButton: brandColors.airForceBlue,//
        buttonRowDisabled: brandColors.subtleGray,
        buttonDoesNotMeetEei: brandColors.tomatoRed,
        fontActive: brandColors.notEggWhite,
        backgroundLoading: brandColors.coolBlack,
        backgroundUsernameSuffix: brandColors.warmGray,
        backgroundInput: brandColors.mediumBlueGray,
        fontUsernameSuffix: brandColors.lighterGray,
        loginIcon: brandColors.mediumBrightBlue,//
        backgroundSidebar: brandColors.steelBlue,
        backgroundIxnSidebar: brandColors.darkRedBlue,//
        backgroundMetricsCard: brandColors.darkBlue,
        fontMetricsHeader: brandColors.brightBlue,
        modalInputBorder: brandColors.subtlerGray,
        fontHeader: brandColors.skyBlueGreen,//
        backgroundFocus: brandColors.mediumBlueGray,//
        borderAddButton: brandColors.mediumGreenBlue,//
        dateDividerHighlight: brandColors.mediumGreenBlue,//
        backgroundPillButton: brandColors.darkGreenBlue,//
        fontSubHeader: brandColors.lightBlueGray,//
        copyTgtBorder: brandColors.lightCoolBlack,//
        dateDividerBox: brandColors.mediumBrightBrightBlue,//
        itemSelected: brandColors.airForceBlue,//
    },

    font: {
        title: 'Roboto',
        tableHeader: 'Roboto',
        weightRow: 400,
        weightMedium: 500,
        weightBold: 700,
        weightBolder: 900,
        weightSubHeader: 300,
        sizeRow: '16px',
        familyHeader: 'Roboto',
        weightHeader: 400,
        sizeHeader: '24px',
        sizeHeaderSmall: '16px',
        familyRegion: 'Roboto',
        weightRegion: 500,
        sizeRegion: '18px',
        sizeRowSmall: '12px',
        sizeRowMedium: '14px',
        sizeMetricsHeader: '20px',
        sizeHelperText: '28px',
        sizeModalHeader: '30px',
        sizeBigMetric: '40px',
    },

    item_height: {
        normal: '65px',
},
    header_heights: {
        panel: '38px',
        content: '22px',
        main: '30px',
        app: '60px'
    }
};

    const muiPalette = createPalette(
        {
            type: 'dark',
            primary: {
                main: theme.color.primaryButton,
            },
        });

    export const muiTheme = createTheme(
        {
            overrides: {
                MuiDialog: {
                    paper: {
                        alignItems: 'center'
                    }
                },
                MuiList: {
                    root: {
                        outline: 'none'
                    }
                },
                MuiButton: {
                    text: {
                        minWidth: 0,
                        minHeight: 0
                    }
                }
            },
            palette: muiPalette,
        });

export default theme;
