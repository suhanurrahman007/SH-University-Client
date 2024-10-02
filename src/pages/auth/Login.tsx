import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SHInput from "../../components/form/SHInput";
import SHForm from "../../components/form/SHForm";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    userId: "A-0001",
    password: "123456",
  };
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Login...!!");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login Successfully...!!", { id: toastId, duration: 2000 });
      if (res?.data?.needsPasswordChange) {
        navigate("/change-password");
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <SHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <SHInput type="text" name="userId" label="ID" />
        </div>
        <div>
          <SHInput type="text" name="password" label="Password" />
        </div>
        <Button htmlType="submit">Login</Button>
      </SHForm>
    </Row>
  );
};

export default Login;
