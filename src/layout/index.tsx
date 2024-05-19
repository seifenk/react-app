import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Avatar } from "antd";
import { Outlet } from "react-router-dom";
import { menu } from "@/router/index";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInfo } from "@/store/module/user";
import { formatRoutesToMenu } from "@/utils/index";
const { Header, Sider, Content } = Layout;

const ProLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector((state: any) => state.user.userInfo);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const items = formatRoutesToMenu(menu, "");

    const onSelect = ({ key }: { key: any }) => {
        navigate(key);
    };

    const dropdownList = [
        {
            key: "1",
            label: <span>个人中心</span>,
        },
        {
            key: "2",
            label: <span>退出登录</span>,
        },
    ];

    return (
        <Layout style={{ height: "100%" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} items={items} onSelect={onSelect} />
            </Sider>
            <Layout style={{ overflow: "auto" }}>
                <Header className="flex justify-between" style={{ padding: 0, background: colorBgContainer, position: "sticky", top: 0, zIndex: 1 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />

                    <div className="mr-[40px]">
                        <Dropdown menu={{ items: dropdownList }} placement="bottom" arrow>
                            {userInfo.avatar ? <Avatar size="large" src={process.env.REACT_APP_FILE_URL + userInfo.avatar} /> : <Avatar size="large" icon={<UserOutlined />} />}
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "20px",
                        padding: 20,
                        minHeight: "auto",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProLayout;
