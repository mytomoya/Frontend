import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

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
    },
    yaxis: {
        title: { text: "Value" },
    },
};

interface Props {
    data: number[];
}

const LineChart = ({ data }: Props) => {
    const series = [
        {
            name: "example name",
            data: data.map((value, index) => {
                return {
                    x: index,
                    y: value,
                };
            }),
        },
    ];

    console.log(data);

    return (
        <>
            <ApexCharts
                options={options}
                series={series}
                type="line"
                height={300}
            />
        </>
    );
};

export default LineChart;
