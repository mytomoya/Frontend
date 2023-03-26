import { useState, useEffect } from "react";
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
        type: "datetime",
        // range: TIME_RANGE_IN_MILLISECONDS,
        title: {
            text: "Datetime",
        },
        labels: {
            datetimeUTC: false,
        },
    },
    yaxis: {
        title: { text: "Value" },
    },
};

const LineChart = () => {
    const [data, setData] = useState<any>([]);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [capturing, setCapturing] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);

    const startDataGeneration = () => {
        if (intervalId != null) {
            return;
        }
        const id = setInterval(() => {
            const newData = {
                x: new Date(),
                y: Math.floor(Math.random() * 100),
            };

            setData((prevData: any) => [...prevData, newData]);
        }, 1000);
        setIntervalId(id);
        setCapturing(!capturing);
    };

    const stopDataGeneration = () => {
        if (intervalId == null) {
            return;
        }
        clearInterval(intervalId);
        setIntervalId(null);
        setCapturing(!capturing);
    };

    const series = [
        {
            name: "example name",
            data: data,
        },
    ];

    const onClickButton = () => {
        if (capturing) {
            stopDataGeneration();
        } else {
            startDataGeneration();
        }
    };

    return (
        <>
            <button onClick={onClickButton}>
                {capturing ? "Stop" : "Start"}
            </button>
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
