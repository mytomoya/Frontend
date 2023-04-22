import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import style from "../scss/history/LineChart.module.scss";
import { Item } from "../api/Types";
import { formatDate } from "../Helper";
import { useEffect, useState } from "react";
import { Data } from "../Container";

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
const THRESHOLD = 0.3;
const numberOfSpans = 6;

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
        labels: {
            formatter: (value: number) => {
                return value.toFixed(3);
            },
        },
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
};

interface ResultType {
    score: string;
    span: JSX.Element;
}

interface Props {
    item: Item;
}

const LineChart = ({ item }: Props): JSX.Element => {
    const data = item.dataJson;

    let totalTime = 0;
    let _time = [0, ...data.time.map((value) => (totalTime += value))];

    const series = [
        {
            name: "y",
            data: data.time.map((value, index) => {
                return {
                    x: time[index],
                    y: index < data.yAcc.length ? data.yAcc[index] : 0,
                };
            }),
        },
        {
            name: "z",
            data: data.time.map((value, index) => {
                return {
                    x: time[index],
                    y: index < data.zAcc.length ? data.zAcc[index] : 0,
                };
            }),
        },
    ];

    const formattedDate = formatDate(item.datetime);
    const [day, time] = formattedDate.split(" ");
    const [result, setResult] = useState<ResultType>({
        score: "",
        span: <></>,
    });

    useEffect(() => {
        const _result = getResult(data);
        setResult(_result);
    }, [data]);

    const getWorstSpan = (flags: number[]): number => {
        const spanScores: number[] = [];
        const chankSize = Math.floor(flags.length / numberOfSpans);

        for (let i = 0; i < 6; i++) {
            const total = flags.reduce((accumulation, current, index) => {
                if (index >= flags.length) {
                    return accumulation;
                }
                if (i * chankSize <= index && index < (i + 1) * chankSize) {
                    return accumulation + current;
                }
                return accumulation;
            }, 0);
            spanScores.push(total);
        }
        console.log(spanScores);

        const index = spanScores.indexOf(Math.max(...spanScores));
        return index;
    };

    const getResult = ({ yAcc }: Data): ResultType => {
        if (yAcc.length === 0) {
            return { score: "", span: <></> };
        }

        const flags = yAcc.map((value, index): number => {
            return value <= THRESHOLD ? 1 : 0;
        });
        const numCorrect = flags.reduce((accumulation, current) => {
            return accumulation + current;
        }, 0);

        const score = (numCorrect / yAcc.length) * 100;

        const _result = `${score.toFixed(2)}`;
        const worstSpan = getWorstSpan(flags);
        console.log(worstSpan);

        const span =
            worstSpan < numberOfSpans / 2
                ? "During Lift up"
                : "During Lift down";
        let phase = "";
        if (worstSpan === 0 || worstSpan === 3) {
            phase += "Beggining of the exercise";
        } else if (worstSpan === 1 || worstSpan === 4) {
            phase += "Middle of the exercise";
        } else {
            phase += "At the End of the exercise";
        }

        return {
            score: _result,
            span: (
                <>
                    <div className={style["span-wrapper"]}>
                        <span className={style["span-label"]}>Span</span>:{" "}
                        <span className={style["span-name"]}>{span}</span>
                    </div>
                    <div className={style["phase-wrapper"]}>
                        <span className={style["phase-label"]}>Phase</span>:{" "}
                        <span className={style["phase-name"]}>{phase}</span>
                    </div>
                </>
            ),
        };
    };

    return (
        <div id={style["root"]}>
            <h2>{`${day} ${time}`}</h2>
            <ApexCharts
                options={options}
                series={series}
                type="line"
                height={400}
            />
            {result.score !== "" && (
                <div className={style["result-wrapper"]}>
                    <div className={style["result-container"]}>
                        <div className={style["result"]}>
                            <div className={style["score"]}>
                                <span className={style["score-label"]}>
                                    Score
                                </span>
                                :{" "}
                                <span className={style["point"]}>
                                    {result.score}
                                </span>{" "}
                                %
                            </div>
                            <div className={style["span"]}>{result.span}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LineChart;
