import { Item } from "../api/Types";
import style from "../scss/history/Table.module.scss";
import { formatDate } from "../Helper";

interface Props {
    records: Item[];
    checkedRecord: number;
    setCheckedRecord: (checkedRecord: number) => void;
}

const Table = ({ records, checkedRecord, setCheckedRecord }: Props) => {
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

    let className = `${style["buttons"]}`;
    if (checkedRecord === -1) {
        className += ` ${style["disabled"]}`;
    }

    return (
        <div id={style["root"]}>
            <h2>History</h2>
            {list()}
            <div className={className}>
                <div>
                    <button className="default-button">Show</button>
                </div>
                <div>
                    <button className={`default-button ${style["delete"]}`}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
