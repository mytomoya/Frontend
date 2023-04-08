import { useEffect, useState } from "react";
import { getRecords } from "../api/Handler";
import { Item } from "../api/Types";
import style from "../scss/History.module.scss";
import Table from "./Table";

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

    return (
        <div>
            <Table
                records={records}
                checkedRecord={checkedRecord}
                setCheckedRecord={setCheckedRecord}
            />
        </div>
    );
};

export default History;
