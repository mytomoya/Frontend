import { useEffect, useState } from "react";
import { getRecords } from "../api/Handler";
import { Item } from "../api/Types";
import style from "../scss/History.module.scss";
import { formatDate } from "../Helper";

const History = () => {
    const [checkedRecord, setCheckedRecord] = useState<number>(-1);
    const [records, setRecords] = useState<Item[]>([]);

    const fetchData = async (offset: number = 0) => {
        const response = await getRecords(offset);

        if (response === null) {
            return;
        }

        setRecords(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const list = (): JSX.Element => {
        return (
            <div id={style["table"]}>
                <div id={style["header"]} className={style["item"]}>
                    <div className={style["index"]}>Index</div>
                    <div className={style["record"]}>Record</div>
                </div>

                {records.map((value, index) => {
                    const date = Date.parse(value.datetime);
                    const formattedDate = formatDate(date);
                    const [day, time] = formattedDate.split(" ");

                    let className = `${style["item"]}`;
                    if (value.id === checkedRecord) {
                        className += ` ${style["checked"]}`;
                    }

                    return (
                        <div
                            key={value.id}
                            className={className}
                            onClick={() => setCheckedRecord(value.id)}
                        >
                            <div className={style["index"]}>{index + 1}</div>
                            <div className={style["record"]}>
                                <span>{day}</span>
                                <span> {time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div id={style["root"]}>
            <h2>History</h2>
            {list()}
        </div>
    );
};

export default History;
