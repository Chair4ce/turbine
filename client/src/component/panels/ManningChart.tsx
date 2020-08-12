import * as React from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useLayoutEffect, useRef} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

interface Props {
className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        }
    }),
);

const ManningChart: React.FC<Props> = props => {
    const classes = useStyles();
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

        //on hover datapoint tab lookin thing
        // series.fill = am4core.color('white')
        valueAxis.renderer.labels.template.fill = am4core.color('white')
        dateAxis.renderer.labels.template.fill = am4core.color('white')
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
    return (
        <div className={classNames(props.className, classes.root)}>
            <div id="chartdiv" style={{width: "100%", height: "500px"}}/>
        </div>
    );
};

export default ManningChart;