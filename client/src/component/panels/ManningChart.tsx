import * as React from 'react';
import {useLayoutEffect, useRef} from 'react';
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
    const chart = useRef(null);

    useLayoutEffect(() => {
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // let x = am4core.create("chartdiv", am4charts.XYChart);
        // x.paddingRight = 20;
        //
        // let data = [];
        // let visits = 10;
        //
        // for (let i = 1; i < 366; i++) {
        //     visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        //     data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        // }
        //
        // x.data = data;
        //
        // let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        // dateAxis.renderer.grid.template.location = 0;
        //
        // let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
        //
        // valueAxis.tooltip.disabled = true;
        // valueAxis.renderer.minWidth = 35;
        //
        // let series = x.series.push(new am4charts.LineSeries());
        // series.dataFields.dateX = "date";
        //
        // //on hover datapoint tab lookin thing
        // // series.fill = am4core.color('white')
        // valueAxis.renderer.labels.template.fill = am4core.color('white')
        // dateAxis.renderer.labels.template.fill = am4core.color('white')
        // series.dataFields.valueY = "value";
        // series.tooltipText = "{valueY.value}";
        // x.cursor = new am4charts.XYCursor();
        // let scrollbarX = new am4charts.XYChartScrollbar();
        // scrollbarX.series.push(series);
        // x.scrollbarX = scrollbarX;
        //
        //
        // chart.current = x;

        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.maskBullets = false;

        let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

        xAxis.dataFields.category = "month";
        yAxis.dataFields.category = "afsc";

        xAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.minGridDistance = 40;

        yAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.inversed = true;
        yAxis.renderer.minGridDistance = 60;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "month";
        series.dataFields.categoryY = "afsc";
        series.dataFields.value = "value";
        series.sequencedInterpolation = true;
        series.defaultState.transitionDuration = 2000;

        let bgColor = new am4core.InterfaceColorSet().getFor("background");
        // @ts-ignore


        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 1;
        columnTemplate.strokeOpacity = 0.2;
        columnTemplate.stroke = bgColor;
        columnTemplate.tooltipText = "{month}, {afsc}: {value.workingValue.formatNumber('#.')}";
        columnTemplate.width = am4core.percent(100);
        columnTemplate.height = am4core.percent(100);

        series.heatRules.push({
            target: columnTemplate,
            property: "fill",
            min: am4core.color("#863232"),
            max: am4core.color(bgColor),
        });

// heat legend
        let heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
        heatLegend.width = am4core.percent(100);
        heatLegend.series = series;
        heatLegend.valueAxis.renderer.labels.template.fontSize = 8;
        heatLegend.valueAxis.renderer.minGridDistance = 60;

// heat legend behavior
        series.columns.template.events.on("over", function(event) {
            handleHover(event.target);
        })

        series.columns.template.events.on("hit", function(event) {
            handleHover(event.target);
        })

        function handleHover(column: any) {
            if (!isNaN(column.dataItem.value)) {
                heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
            }
            else {
                heatLegend.valueAxis.hideTooltip();
            }
        }

        series.columns.template.events.on("out", function(event) {
            heatLegend.valueAxis.hideTooltip();
        })

        chart.data = props.chartData;

        // chart.data = [
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "29%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "25%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "23%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "22%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "23%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "20%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "21%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "22%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "24%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "27%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "29%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "31%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "31%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "37%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "36%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X3",
        //         "month": "Jan",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "27%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "38%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "44%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "39%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "46%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "57%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "70%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "80%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "84%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "93%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "90%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "85%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "85%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "83%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "86%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "78%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "69%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "59%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "55%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "54%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "50%"
        //     },
        //     {
        //         "afsc": "3D0X2",
        //         "month": "Feb",
        //         "value": "48%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "44%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "39%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "44%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "47%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "45%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "57%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "65%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "81%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "88%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "92%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "104%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "101%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "92%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "92%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "96%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "97%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "96%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "87%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "86%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "99%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "102%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "91%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "Mar",
        //         "value": "85%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "81%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "71%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "56%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "68%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "81%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "84%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "94%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "99%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "114%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "124%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "93%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "99%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "96%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "90%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "89%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "90%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "88%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "83%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "69%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "58%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "51%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "49%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "44%"
        //     },
        //     {
        //         "afsc": "3D1X1",
        //         "month": "Apr",
        //         "value": "41%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "36%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "65%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "62%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "69%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "65%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "64%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "81%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "85%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "85%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "88%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "94%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "89%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "81%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "82%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "83%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "82%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "76%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "64%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "54%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "49%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "46%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "43%"
        //     },
        //     {
        //         "afsc": "3D0X3",
        //         "month": "May",
        //         "value": "40%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "40%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "36%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "39%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "40%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "40%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "45%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "54%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "69%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "77%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "78%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "86%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "82%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "76%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "74%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "74%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "74%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "69%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "59%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "50%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "46%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "42%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "38%"
        //     },
        //     {
        //         "afsc": "1N051A",
        //         "month": "Jun",
        //         "value": "38%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "35%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "28%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "28%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "23%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "22%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "21%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "25%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "29%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "35%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "35%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "31%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Aug",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "28%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "26%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "35%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "28%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "28%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "23%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "22%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "21%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "25%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "29%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "35%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "35%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "33%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "34%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Sep",
        //         "value": "31%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "32%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "30%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "28%"
        //     },
        //     {
        //         "afsc": "3D1X2",
        //         "month": "Oct",
        //         "value": "26%"
        //     }
        // ];

    }, []);
    return (
        <div className={classNames(props.className, classes.root)}>
            <div id="chartdiv" style={{width: "100%", height: "calc(100vh - 80px)"}}/>
        </div>
    );
};

export default ManningChart;