import { Layout, Menu } from "antd";
import sidebarRoutesGenerator from "../../utils/sidebarRoutesGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.route";
import { studentPaths } from "../../routes/student.route";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {

  const role = userRole.ADMIN;
  let SidebarItems;

  switch (role) {
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
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
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
