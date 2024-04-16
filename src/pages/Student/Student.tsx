import { Table } from "antd";
import { useEffect, useState } from "react";
import { postStuPage } from "@/api/index";

const StuList = () => {
    const columns = [
        {
            title: "姓名",
            dataIndex: "name",
        },
        {
            title: "年龄",
            dataIndex: "age",
        },
        {
            title: "手机号",
            dataIndex: "phone",
        },
        {
            title: "邮箱",
            dataIndex: "email",
        },
    ];
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        postStuPage({ pageNum: 1, pageSize: 10 }).then(res => {
            setTableData(res.data.data);
        });
    }, []);

    return (
        <>
            <div></div>
            <Table dataSource={tableData} columns={columns} rowKey="id" />
        </>
    );
};

export default StuList;
