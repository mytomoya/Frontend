import { useEffect, useState } from "react";
import { getRecords } from "../api/Handler";
import { Item } from "../api/Types";
import Table from "./Table";
import LineChart from "./LineChart";

interface Props {
    updated: boolean;
    setUpdated: (value: boolean) => void;
}

const History = ({ updated, setUpdated }: Props) => {
    const [checkedRecord, setCheckedRecord] = useState<number>(-1);
    const [records, setRecords] = useState<Item[]>([]);

    const fetchData = async (offset: number): Promise<boolean> => {
        const response = await getRecords(offset);

        if (response === null) {
            return false;
        } else if (response.data.length === 0) {
            return false;
        }

        setRecords(response.data);
        return true;
    };

    useEffect(() => {
        fetchData(0);
        setUpdated(false);
    }, [updated]);

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
