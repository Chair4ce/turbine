import * as React from 'react';
import {useLayoutEffect} from 'react';
import classNames from "classnames";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ManningChartModel from "../../store/positions/models/ManningChartModel";

interface Props {
    chartData: ManningChartModel[];
    className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%'
        }
    }),
);

const ManningChart: React.FC<Props> = props => {
    const classes = useStyles();

    useLayoutEffect(() => {
        // am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.data = props.chartData;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 60;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

// only for the legend
        let iconSeries = chart.series.push(new am4charts.ColumnSeries())
        iconSeries.fill = am4core.color("#ec0800");
        iconSeries.strokeOpacity = 0;
        iconSeries.stroke = am4core.color("#ec0800");
        iconSeries.name = "Events";
        iconSeries.dataFields.dateX = "date";
        iconSeries.dataFields.valueY = "v";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.openValueY = "authorized";
        series.dataFields.valueY = "assigned";
        series.tooltipText = "authorized: {openValueY.value} assigned: {valueY.value}";
        series.sequencedInterpolation = true;
        series.stroke = am4core.color("#1b7cb3");
        series.strokeWidth = 2;
        series.name = "District Metered Usage";
        series.stroke = chart.colors.getIndex(0);
        series.fill = series.stroke;
        series.fillOpacity = 0.8;

        let bullet = series.bullets.push(new am4charts.CircleBullet())
        bullet.fill = new am4core.InterfaceColorSet().getFor("background");
        bullet.fillOpacity = 1;
        bullet.strokeWidth = 2;
        bullet.circle.radius = 4;

        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "authorized";
        series2.sequencedInterpolation = true;
        series2.strokeWidth = 2;
        series2.tooltip.getFillFromObject = false;
        series2.tooltip.getStrokeFromObject = true;
        series2.tooltip.label.fill = am4core.color("#000");
        series2.name = "SP Aggregate usage";
        series2.stroke = chart.colors.getIndex(7);
        series2.fill = series2.stroke;

        let bullet2 = series2.bullets.push(new am4charts.CircleBullet())
        bullet2.fill = bullet.fill;
        bullet2.fillOpacity = 1;
        bullet2.strokeWidth = 2;
        bullet2.circle.radius = 4;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        chart.scrollbarX = new am4core.Scrollbar();

        let negativeRange: any;

// create ranges

// create ranges
        chart.events.on("datavalidated", function () {
            series.dataItems.each(function (s1DataItem) {
                let s1PreviousDataItem;
                let s2PreviousDataItem;

                let s2DataItem = series2.dataItems.getIndex(s1DataItem.index);

                if (s1DataItem.index > 0) {
                    s1PreviousDataItem = series.dataItems.getIndex(s1DataItem.index - 1);
                    s2PreviousDataItem = series2.dataItems.getIndex(s1DataItem.index - 1);
                }

                let startTime = am4core.time.round(new Date(s1DataItem.dateX.getTime()), dateAxis.baseInterval.timeUnit, dateAxis.baseInterval.count).getTime();

                // intersections
                if (s1PreviousDataItem && s2PreviousDataItem) {
                    let x0 = am4core.time.round(new Date(s1PreviousDataItem.dateX.getTime()), dateAxis.baseInterval.timeUnit, dateAxis.baseInterval.count).getTime() + dateAxis.baseDuration / 2;
                    let y01 = s1PreviousDataItem.valueY;
                    let y02 = s2PreviousDataItem.valueY;

                    let x1 = startTime + dateAxis.baseDuration / 2;
                    let y11 = s1DataItem.valueY;
                    let y12 = s2DataItem.valueY;

                    let intersection = am4core.math.getLineIntersection({x: x0, y: y01}, {x: x1, y: y11}, {
                        x: x0,
                        y: y02
                    }, {x: x1, y: y12});

                    startTime = Math.round(intersection.x);
                }

                // start range here
                if (s2DataItem.valueY > s1DataItem.valueY) {
                    if (!negativeRange) {
                        negativeRange = dateAxis.createSeriesRange(series);
                        negativeRange.date = new Date(startTime);
                        negativeRange.contents.fill = series2.fill;
                        negativeRange.contents.fillOpacity = 0.8;
                    }
                } else {
                    // if negative range started
                    if (negativeRange) {
                        negativeRange.endDate = new Date(startTime);
                    }
                    negativeRange = undefined;
                }
                // end if last
                if (s1DataItem.index == series.dataItems.length - 1) {
                    if (negativeRange) {
                        negativeRange.endDate = new Date(s1DataItem.dateX.getTime() + dateAxis.baseDuration / 2);
                        negativeRange = undefined;
                    }
                }
            })
        })


    }, [props.chartData]);

    return (
        <div className={classNames(props.className, classes.root)}>
            <div id="chartdiv" style={{width: "100%", height: "calc(100vh - 80px)"}}/>
        </div>
    );
};

export default ManningChart;