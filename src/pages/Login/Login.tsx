import "./style.scss";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import { postLogin, postAddUser } from "@/api";
import { useNavigate } from "react-router-dom";
import { setToken } from "@/utils/auth";
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const login = async () => {
        const values = await form.validateFields();
        const res = await postLogin(values);
        setToken(res.data.accessToken);
        navigate("/");
    };

    const register = async () => {
        const values = await form.validateFields();
        const res = await postAddUser({ ...values, role: 0 });
        login();
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="login-card">
                    <h1 className="text-center">随便练练</h1>
                    <Form name="basic" form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} autoComplete="off">
                        <Form.Item<FieldType> label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" onClick={login}>
                                登录
                            </Button>
                            <Button type="primary" htmlType="button" onClick={register}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
