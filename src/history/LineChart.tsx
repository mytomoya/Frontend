import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import style from "../scss/history/LineChart.module.scss";
import { Item } from "../api/Types";
import { formatDate } from "../Helper";

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;

const options: ApexOptions = {
    chart: {
        id: "basic-line",
        animations: {
            easing: "easeinout",
            animateGradually: {
                enabled: false,
            },
            dynamicAnimation: {
                speed: 1000,
            },
        },
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        // range: TIME_RANGE_IN_MILLISECONDS,
        title: {
            text: "time",
        },
        labels: {
            show: false,
        },
    },
    yaxis: {
        title: { text: "Value" },
    },
    annotations: {
        yaxis: [
            {
                y: -0.3,
                y2: 0.3,
                borderColor: "#000",
                fillColor: "#FEB019",
                label: {
                    text: "safe range",
                },
            },
        ],
    },
    colors: ["#cf0000"],
};

interface Props {
    item: Item;
}

const LineChart = ({ item }: Props): JSX.Element => {
    const data = item.dataJson;

    const series = [
        {
            name: "y",
            data: data.time.map((value, index) => {
                return {
                    x: value,
                    y: index < data.yAcc.length ? data.yAcc[index] : 0,
                };
            }),
        },
        {
            name: "z",
            data: data.time.map((value, index) => {
                return {
                    x: value,
                    y: index < data.zAcc.length ? data.zAcc[index] : 0,
                };
            }),
        },
    ];

    const formattedDate = formatDate(item.datetime);
    const [day, time] = formattedDate.split(" ");

    return (
        <div id={style["root"]}>
            <h2>{`${day} ${time}`}</h2>
            <ApexCharts
                options={options}
                series={series}
                type="line"
                height={400}
            />
        </div>
    );
};

export default LineChart;
