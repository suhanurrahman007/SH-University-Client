import { Layout, Menu } from "antd";
import sidebarRoutesGenerator from "../../utils/sidebarRoutesGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.route";
import { studentPaths } from "../../routes/student.route";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {

  const token = useAppSelector(useCurrentToken);

  let user

  if (token) {
    user = verifyToken(token);
  }

  let SidebarItems

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      SidebarItems = sidebarRoutesGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.FACULTY:
      SidebarItems = sidebarRoutesGenerator(facultyPaths, userRole.FACULTY);
      break;

    case userRole.STUDENT:
      SidebarItems = sidebarRoutesGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
     style={{height: '100vh', position: 'sticky', top: '0', left: '0'}}
    >
      <div
        style={{
          color: "white",

          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>S H University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={SidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
