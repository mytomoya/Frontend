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
};

interface Props {
    item: Item;
}

interface DataType {
    x: number;
    y: number;
}

const LineChart = ({ item }: Props): JSX.Element => {
    const data = item.dataJson;

    const converToSeries = (): DataType[] => {
        let dataList: DataType[] = [];
        for (let i = 0; i < data.time.length; i++) {
            dataList.push({
                x: data.time[i],
                y: data.values[i],
            });
        }

        return dataList;
    };

    const series = [
        {
            name: "example name",
            data: converToSeries(),
        },
    ];

    const date = Date.parse(item.datetime);
    const formattedDate = formatDate(date);
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
