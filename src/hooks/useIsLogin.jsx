import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../store/actions/user.action";

export function useIsLogin() {
  const dispatch = useDispatch();
  const userLogin = localStorage.getItem("userLogin");
  const username = userLogin ? JSON.parse(userLogin).username : "";
  useEffect(
    () => {
      userLogin && dispatch(getAdmin(username));
    },
    // eslint-disable-next-line
    [username]
  );
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.common);
  const adminRole = admin == null ? 1 : admin.roles.length;

  return {
    isLogin: user,
    isLoginToAdmin: adminRole,
    user,
    loading,
  };
}
