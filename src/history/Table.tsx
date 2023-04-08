import { Item } from "../api/Types";
import style from "../scss/history/Table.module.scss";
import { formatDate } from "../Helper";
import { deleteRecord } from "../api/Handler";
import { useState } from "react";

interface Props {
    records: Item[];
    checkedRecordID: number;
    setCheckedRecord: (checkedRecord: number) => void;
}

const Table = ({ records, checkedRecordID, setCheckedRecord }: Props) => {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

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
                    if (value.id === checkedRecordID) {
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

    let className = `${style["buttons"]}`;
    if (checkedRecordID === -1) {
        className += ` ${style["disabled"]}`;
    }

    const deleteData = async (id: number) => {
        const success = await deleteRecord(id);

        if (success) {
            setMessage("Deleted successfully");
        } else {
            setMessage("Failed to delete");
        }

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <div id={style["root"]}>
            <h2>History</h2>
            {list()}
            <div className={className}>
                <button
                    className={`default-button ${style["delete"]}`}
                    onClick={() => deleteData(checkedRecordID)}
                >
                    Delete
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
        </div>
    );
};

export default Table;
