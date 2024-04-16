import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import { menu } from "@/router/index";
import { useNavigate, useLocation } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const formatMenu = (routeList: any[], prefix?: string) => {
    const arr: any = [];
    routeList.forEach(item => {
        const obj: any = {
            key: item.path,
            label: item.label,
            icon: <AppstoreOutlined />,
        };

        if (item.children) {
            obj.children = formatMenu(item.children);
            arr.push(obj);
        } else {
            arr.push(obj);
        }
    });

    return arr;
};

const ProLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const items = formatMenu(menu);

    const onSelect = ({ key }: { key: any }) => {
        navigate(key);
    };

    return (
        <Layout style={{ height: "100%" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} items={items} onSelect={onSelect} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, position: "sticky" }}>
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
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
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
