/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import SHForm from "../../components/form/SHForm";
import SHInput from "../../components/form/SHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.api";
import { TResponse } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logout());
      return navigate("/login");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <SHForm onSubmit={onSubmit}>
        <div>
          <SHInput type="text" name="oldPassword" label="Old Password" />
        </div>
        <div>
          <SHInput type="text" name="newPassword" label="New Password" />
        </div>
        <Button htmlType="submit">Login</Button>
      </SHForm>
    </Row>
  );
};

export default ChangePassword;
