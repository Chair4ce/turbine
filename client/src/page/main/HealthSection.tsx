import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as React from "react";
import {useLayoutEffect, useRef, useState} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {ROSTER_MENU_SELECT_ACTION} from "../../component/menus/RosterMenu";
import SideBar from "../../component/sidebar/SideBar";
import HealthSideBar from "../../component/sidebar/HealthSideBar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            top: 68,
            overflow: 'hidden',
            left: 0,
            right: 0,
            bottom: 0,
        },
        sidebar_container: {
            position: 'relative',
            height: '100%',
        },
        main: {
            position: 'relative',
            width: '100%',
            height: '100%',
        }
    }),
);

interface Props {
    className?: string;
}

const HealthSection: React.FC<Props> = props => {
    const classes = useStyles();
    const [showCurrentPanel, toggleCurrentPanel] = useState(false);
    const [showProjectedPanel, toggleProjectedPanel] = useState(false);
    const [showGainingPanel, toggleGainingPanel] = useState(false);
    const [showLosingPanel, toggleLosingPanel] = useState(false);
    const [showPositionPanel, togglePositionPanel] = useState(false);

    const chart = useRef(null);

    useLayoutEffect(() => {
        let x = am4core.create("chartdiv", am4charts.XYChart);

        x.paddingRight = 20;

        let data = [];
        let visits = 10;

        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }

        x.data = data;

        let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = x.yAxes.push(new am4charts.ValueAxis());

        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = x.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value}";
        x.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        x.scrollbarX = scrollbarX;


        chart.current = x;

        return () => {
            x.dispose();
        };
    }, []);

    // const currentCollectionAFSC: GenericGroupCollectionModel[] = useSelector(({members}: ApplicationState) => members.genericAFSCList);
    // const [fileData, updateFileData] = useState();
    // const menuSelectHandler = (type: string) => {
    //     switch (type) {
    //         case ROSTER_MENU_SELECT_ACTION.TOGGLE_CURRENT_ROSTER:
    //             toggleCurrentPanel(prev => !prev)
    //             break;
    //         case ROSTER_MENU_SELECT_ACTION.TOGGLE_PROJECTED_ROSTER:
    //             toggleProjectedPanel(prev => !prev)
    //             break;
    //         case ROSTER_MENU_SELECT_ACTION.TOGGLE_GAINING_ROSTER:
    //             toggleGainingPanel(prev => !prev)
    //             break;
    //         case ROSTER_MENU_SELECT_ACTION.TOGGLE_LOSING_ROSTER:
    //             toggleLosingPanel(prev => !prev)
    //             break;
    //         case ROSTER_MENU_SELECT_ACTION.TOGGLE_POSITION_PANEL:
    //             togglePositionPanel(prev => !prev)
    //     }
    // }


    return (
        <section className={classes.root}>
            <div className={classes.sidebar_container}>
                <HealthSideBar

                />
            </div>
            <article className={classes.main}>
                <div id="chartdiv" style={{width: "100%", height: "500px"}}/>
            </article>
        </section>
    );
};


export default HealthSection;