import { Upload, Form, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { postUpdateStu } from "@/api/index";
const MyInfo = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [form] = Form.useForm();

    const prefix = process.env.REACT_APP_FILE_URL;
    const fullURL = imageUrl && prefix + imageUrl;
    const handleChange = info => {
        if (info.file.status === "done") {
            setImageUrl(info.file.response.data);
        }
    };

    const handleSave = async () => {
        const values = await form.validateFields();

        if (imageUrl) values.user = { avatar: imageUrl };
        const res = await postUpdateStu(values);
        if (res.code == 200) message.success("保存成功");
    };
    return (
        <>
            <h1>个人信息</h1>
            <Form form={form} style={{ maxWidth: "600px" }} labelCol={{ flex: "80px" }}>
                <Form.Item label="头像">
                    <Upload onChange={handleChange} maxCount={1} listType="picture-circle" showUploadList={false} action="http://localhost:3010/file/upload">
                        {fullURL ? <img src={fullURL} alt="avatar" style={{ width: "100%", borderRadius: "50%" }} /> : <PlusOutlined />}
                    </Upload>
                </Form.Item>
                <Form.Item name="name" label="姓名">
                    <Input />
                </Form.Item>
                <Form.Item name="age" label="年龄">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="phone" label="手机号">
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="邮箱">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="button" onClick={handleSave}>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default MyInfo;
