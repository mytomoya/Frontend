import style from "../scss/History.module.scss";

const History = () => {
    const records = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    const list = (): JSX.Element => {
        return (
            <div id={style["table"]}>
                <div id={style["header"]} className={style["item"]}>
                    <div className={style["index"]}>Index</div>
                    <div className={style["record"]}>Record</div>
                </div>

                {records.map((value, index) => {
                    return (
                        <div key={index} className={style["item"]}>
                            <div className={style["index"]}>{index + 1}</div>
                            <div className={style["record"]}>{value}</div>
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
