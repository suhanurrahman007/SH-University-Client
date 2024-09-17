import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("Log Out...!!");
    dispatch(logout());
    toast.error("Logout Successfully...!!", { id: toastId, duration: 2000 });
  };
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header>
          <button onClick={handleLogout}>Logout</button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
