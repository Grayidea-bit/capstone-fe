import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setIsLogin } from '@stores/slice/progressSlice';
import styles from "./GeneralLayout.module.scss";
import { useMemo } from "react";

const GeneralLayout = () => {

    const dispatch = useDispatch();
  const isLogin = useMemo(() => localStorage.getItem('isLogin') === 'true', []);
  dispatch(setIsLogin(isLogin));

  return (
    <div className={styles.container}>
        <Outlet />  
    </div>
  );
};
export default GeneralLayout;
