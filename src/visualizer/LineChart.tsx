import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { save } from "../api/Handler";
import { useState } from "react";

import style from "../scss/LineChart.module.scss";

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
                // TODO: change to actual values
                y: 8600,
                y2: 10000,
                borderColor: "#000",
                fillColor: "#FEB019",
                label: {
                    text: "safe range",
                },
            },
        ],
    },
    legend: {
        onItemClick: {
            toggleDataSeries: true,
        },
        onItemHover: {
            highlightDataSeries: true,
        },
    },
};

interface Props {
    time: number[];
    yAccValues: number[];
    zAccValues: number[];
    setUpdated: (updated: boolean) => void;
}

const LineChart = ({
    time,
    yAccValues,
    zAccValues,
    setUpdated,
}: Props): JSX.Element => {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const series = [
        {
            name: "y",
            data: time.map((value, index) => {
                return {
                    x: value,
                    y: index < yAccValues.length ? yAccValues[index] : 0,
                };
            }),
        },
        {
            name: "z",
            data: time.map((value, index) => {
                return {
                    x: value,
                    y: index < zAccValues.length ? zAccValues[index] : 0,
                };
            }),
        },
    ];

    console.log(yAccValues);
    console.log(zAccValues);

    const saveData = async () => {
        const success = await save(series[0]);
        if (success) {
            setMessage("Saved successfully");
            setUpdated(true);
        } else {
            setMessage("Failed to save");
        }

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <>
            <ApexCharts
                options={options}
                series={series}
                type="line"
                height={400}
            />
            <div className={style["save-button-wrapper"]}>
                <button className="default-button" onClick={saveData}>
                    Save
                </button>
                <div
                    className={style["response-message"]}
                    style={{
                        opacity: showMessage ? 1 : 0,
                    }}
                >
                    {message}
                </div>
            </div>
        </>
    );
};

export default LineChart;
