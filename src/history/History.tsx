import { useEffect, useState } from "react";
import { getRecords } from "../api/Handler";
import { Item } from "../api/Types";
import Table from "./Table";
import LineChart from "./LineChart";

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

    const getCheckedRecordID = (id: number): number => {
        for (let i = 0; i < records.length; i++) {
            if (records[i].id === id) {
                return i;
            }
        }
        return -1;
    };
    const checkedRecordID = getCheckedRecordID(checkedRecord);

    return (
        <>
            <Table
                records={records}
                checkedRecordID={checkedRecord}
                setCheckedRecord={setCheckedRecord}
                fetchData={fetchData}
            />
            {checkedRecord !== -1 && checkedRecordID !== -1 && (
                <LineChart item={records[checkedRecordID]} />
            )}
        </>
    );
};

export default History;
